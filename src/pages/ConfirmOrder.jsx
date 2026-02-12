import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import success from "../assets/success.png";
import error from "../assets/error.png";
import { api_url } from "../utils/config";

const ConfirmOrder = () => {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const checkOrderStatus = async () => {
      try {
        const { data } = await axios.get(
          `${api_url}/api/home/customer/gat-order/${orderId}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const order = data?.order;

        if (!order) {
          setStatus("failed");
          return;
        }

        // ✅ COD ORDER
        if (order.payment_type === "cod") {
          setStatus("success");
        }

        // ✅ ONLINE PAID
        else if (
          order.payment_type === "online" &&
          order.payment_status === "paid"
        ) {
          setStatus("success");
        }

        // ❌ ONLINE FAILED
        else {
          setStatus("failed");
        }
      } catch (error) {
        setStatus("failed");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      checkOrderStatus();
    }
  }, [orderId]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 flex flex-col items-center gap-6">
        {loading ? (
          <FadeLoader color="#16a34a" />
        ) : status === "success" ? (
          <>
            <img src={success} alt="success" className="w-28" />

            <h2 className="text-2xl font-semibold text-green-600">
              Order Placed Successfully
            </h2>

            <p className="text-slate-500 text-sm">Order ID: {orderId}</p>

            <Link
              className="px-6 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-md"
              to="/dashboard/my-orders"
            >
              Go to My Orders
            </Link>
          </>
        ) : (
          <>
            <img src={error} alt="error" className="w-28" />

            <h2 className="text-2xl font-semibold text-red-600">
              Payment Failed
            </h2>

            <p className="text-slate-500 text-sm">Order ID: {orderId}</p>

            <Link
              className="px-6 py-2 bg-red-600 hover:bg-red-700 transition text-white rounded-md"
              to="/dashboard/my-orders"
            >
              Back to Orders
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmOrder;
