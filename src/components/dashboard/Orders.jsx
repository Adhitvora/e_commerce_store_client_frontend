import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_orders } from '../../store/reducers/orderReducer'
import axios from 'axios'
import { api_url } from '../../utils/config'

const Orders = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { myOrders } = useSelector(state => state.order)
    const [state, setState] = useState('all')
    const [payingOrderId, setPayingOrderId] = useState('')


    useEffect(() => {
        dispatch(get_orders({ status: state, customerId: userInfo.id }))
    }, [state, dispatch, userInfo.id])

    const payNow = async (ord) => {
        if (payingOrderId) return

        try {
            setPayingOrderId(ord._id)

            const { data } = await axios.post(
                `${api_url}/api/order/create-payment`,
                { orderId: ord._id },
                { withCredentials: true }
            )

            if (!data?.razorpayOrder) {
                if (data?.message === 'Order already paid') {
                    navigate(`/order/success/${ord._id}`)
                }
                setPayingOrderId('')
                return
            }

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY,
                amount: data.razorpayOrder.amount,
                currency: 'INR',
                name: 'Your Store Name',
                description: 'Order Payment',
                order_id: data.razorpayOrder.id,
                handler: async function (response) {
                    try {
                        await axios.post(
                            `${api_url}/api/order/verify-payment`,
                            {
                                orderId: data.orderId || ord._id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            },
                            { withCredentials: true }
                        )

                        setPayingOrderId('')
                        navigate(`/order/success/${data.orderId || ord._id}`)
                    } catch (error) {
                        setPayingOrderId('')
                        console.log('verify payment error:', error.response?.data || error)
                        alert('Payment ho gaya, lekin verification fail hua. Please retry.')
                    }
                },
                modal: {
                    ondismiss: function () {
                        setPayingOrderId('')
                    }
                },
                theme: {
                    color: '#7fad39'
                }
            }

            const rzp = new window.Razorpay(options)
            rzp.on('payment.failed', function () {
                setPayingOrderId('')
            })
            rzp.open()
        } catch (error) {
            setPayingOrderId('')
            console.log(error.response?.data || error)
            alert('Payment open nahi ho paya. Please try again.')
        }
    }

    return (
        <div className='bg-white p-4 rounded-md'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-slate-600'>My Orders</h2>
                <select className='outline-none px-3 py-1 border rounded-md text-slate-600' value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="all">--order status---</option>
                    <option value="placed">Placed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="warehouse">Warehouse</option>
                </select>
            </div>
            <div className='pt-4'>
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>Order Id</th>
                                <th scope='col' className='px-6 py-3'>Price</th>
                                <th scope='col' className='px-6 py-3'>Payment status</th>
                                <th scope='col' className='px-6 py-3'>Order status</th>
                                <th scope='col' className='px-6 py-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                myOrders.map((o, i) => <tr key={i} className='bg-white border-b'>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o._id}</td>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>₹{o.price}</td>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.payment_status}</td>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o.delivery_status}</td>
                                    <td scope='row' className='px-6 py-4'>
                                        <Link to={`/dashboard/order/details/${o._id}`}>
                                            <span className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded'>view</span>
                                        </Link>
                                        {
                                            o.payment_status !== 'paid' && (
                                                <span
                                                    onClick={() => payingOrderId ? null : payNow(o)}
                                                    className={`text-sm font-normal mr-2 px-2.5 py-[1px] rounded ${payingOrderId === o._id ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-green-100 text-green-800 cursor-pointer'}`}
                                                >
                                                    {payingOrderId === o._id ? 'Opening...' : 'Pay Now'}
                                                </span>
                                            )
                                        }
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Orders
