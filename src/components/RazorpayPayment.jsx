import React from 'react'
import axios from 'axios'
import { api_url } from '../utils/config'

const RazorpayPayment = ({ price, orderId }) => {

    const createPayment = async () => {

        try {

            const { data } = await axios.post(
                `${api_url}/api/order/create-payment`,
                { price, orderId },
                { withCredentials: true }
            )

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY,
                amount: data.amount,
                currency: "INR",
                name: "Your Store Name",
                description: "Order Payment",
                order_id: data.id,
                handler: function () {
                    alert("Payment successful")
                    // Backend webhook will confirm payment
                },
                theme: {
                    color: "#7fad39"
                }
            }

            const rzp = new window.Razorpay(options)
            rzp.open()

        } catch (error) {
            console.log(error.response?.data)
        }
    }

    return (
        <div className='py-8 px-4 bg-white'>
            <button
                onClick={createPayment}
                className='px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg bg-green-600 text-white'
            >
                Pay Now
            </button>
        </div>
    )
}

export default RazorpayPayment
