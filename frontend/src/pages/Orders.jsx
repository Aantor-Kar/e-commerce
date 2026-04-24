import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { toast } from 'react-toastify';
import axios from 'axios'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/user-orders', {}, { headers: { token } })
      if (response.data.success) {
        const allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t border-slate-800/70 pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY '} text2={'ORDERS'} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div key={index} className='theme-soft-card mb-4 flex flex-col gap-4 px-5 py-4 text-slate-100 md:flex-row md:items-center md:justify-between'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='theme-image-frame w-24 am:w-20' src={item.image[0]} alt={item.name} />
              <div>
                <p className='font-medium sm:text-base'>{item.name}</p>
                <div className='mt-1 flex items-center gap-3 text-base text-slate-100'>
                  <p className='text-cyan-300'>{currency}{item.price}.00</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-1'>Date: <span className='theme-copy'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-1'>Payment: <span className='theme-copy'>{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className='flex justify-between md:w-1/2'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button onClick={loadOrderData} className='theme-button-secondary cursor-pointer px-4 py-2 text-sm font-medium'>Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
