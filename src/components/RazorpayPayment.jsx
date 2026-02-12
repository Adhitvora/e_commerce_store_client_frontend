import React from 'react'
import axios from 'axios'
import { api_url } from '../utils/config'

const RazorpayPayment = ({ orderId }) => {

    const createPayment = async () => {

        try {

            const { data } = await axios.post(
                `${api_url}/api/order/create-payment`,
                { orderId },
                { withCredentials: true }
            )

            if (!data?.razorpayOrder) {
                if (data?.message === 'Order already paid') {
                    window.location.href = `/order/success/${orderId}`
                }
                return
            }

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY,
                amount: data.razorpayOrder.amount,
                currency: "INR",
                name: "Your Store Name",
                description: "Order Payment",
                order_id: data.razorpayOrder.id,
                handler: async function (response) {
                    try {
                        await axios.post(
                            `${api_url}/api/order/verify-payment`,
                            {
                                orderId: data.orderId || orderId,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            },
                            { withCredentials: true }
                        )
                        window.location.href = `/order/success/${data.orderId || orderId}`
                    } catch (error) {
                        console.log('verify payment error:', error.response?.data || error)
                        alert('Payment ho gaya, lekin verification fail hua. Please retry.')
                    }
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
