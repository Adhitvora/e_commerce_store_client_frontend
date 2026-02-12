import React, { useState } from "react";
import axios from "axios";
import { api_url } from "../utils/config";

const RazorpayCheckout = ({ price, orderId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      /* -------------------------------
               1️⃣ Create Razorpay Order
            -------------------------------- */

      const { data } = await axios.post(
        `${api_url}/api/order/create-payment`,
        { price, orderId },
        { withCredentials: true },
      );

      /* -------------------------------
               2️⃣ Configure Razorpay Popup
            -------------------------------- */

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "My Shop",
        description: "Order Payment",
        order_id: data.id,

        handler: function (response) {
          // Payment success (verification via webhook)
          window.location.href = `/order/success/${orderId}`;
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        theme: {
          color: "#7fad39",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      setError("Payment initialization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-4 bg-white rounded-md shadow-sm">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-all"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {error && <div className="mt-3 text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default RazorpayCheckout;
