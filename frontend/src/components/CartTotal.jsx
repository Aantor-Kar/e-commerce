import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount, getCartCount, products } = useContext(ShopContext)
    const cartAmount = getCartAmount()
    const isCartRefreshing = getCartCount() > 0 && products.length === 0
  return (
    <div className='theme-card w-full p-6'>
      <div className='text-2xl'>
        <Title text1={'CART '} text2={'TOTALS'} />
      </div>
      <div className='mt-2 flex flex-col gap-2 text-sm text-slate-200'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{isCartRefreshing ? 'Loading...' : `${currency}${cartAmount}.00`}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <b>Total</b>
            <b>{isCartRefreshing ? 'Loading...' : `${currency}${cartAmount === 0 ? 0 : cartAmount + delivery_fee}.00`}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
