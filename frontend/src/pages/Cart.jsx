import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, getCartCount, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const totalCount = getCartCount();
  const isRefreshingCart = totalCount > 0 && products.length === 0;

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (totalCount > 0) ? (
    <div className='border-t border-slate-800/70 pt-14'>
      <div className='mb-3 text-2xl'>
        <Title text1={'YOUR '} text2={'CART'} />
      </div>
      <div>
        {isRefreshingCart ? (
          <div className='theme-card p-6 text-sm theme-copy'>
            <p>Loading your cart items...</p>
          </div>
        ) : null}
        {cartData.map((item) => {
          const productData = products.find((product) => product._id === item._id)

          if (!productData) {
            return null;
          }

          return (
            <div key={`${item._id}-${item.size}`} className='theme-soft-card mb-4 grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4 px-4 py-4 text-slate-100'>
              <div className='flex items-start gap-6'>
                <img className='theme-image-frame w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
                <div>
                  <p className='text-xs font-medium sm:text-lg'>{productData.name}</p>
                  <div className='mt-2 flex items-center gap-5'>
                    <p className='text-cyan-300'>{currency}{productData.price}</p>
                    <p className='theme-soft-card px-2 sm:px-3 sm:py-1'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) => {
                  if (e.target.value === '') {
                    return;
                  }
                  const nextQuantity = Number(e.target.value);
                  if (Number.isNaN(nextQuantity) || nextQuantity < 1) {
                    return;
                  }
                  updateQuantity(item._id, item.size, nextQuantity);
                }}
                className='theme-input max-w-10 rounded-lg px-1 py-1 sm:max-w-20 sm:px-2'
                type="number"
                min={1}
                value={item.quantity}
              />
              <img onClick={() => updateQuantity(item._id, item.size, 0)} className='theme-icon mr-4 w-4 cursor-pointer sm:w-5' src={assets.bin_icon} alt="" />
            </div>
          )
        })}
      </div>
      <div className='my-20 flex justify-end'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='theme-button my-8 px-8 py-3 text-sm cursor-pointer'>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : <div className='border-t border-slate-800/70 pt-14'>
    <div className='mb-3 text-2xl'>
      <Title text1={'YOUR '} text2={'CART'} />
    </div>
    <div className='theme-card w-fit p-6 text-medium theme-copy'>
      <p>Your cart is empty! Add some items from the collection...</p>
      <img className='w-34' src={assets.empty_icon} alt="" />
    </div>
  </div>
}

export default Cart
