import React from 'react'

const NewsletterBox = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
    }
  return (
    <div className='text-center'>
      <p className='text-3xl font-medium text-gray-800'>Subscribe now and get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Subscribe to our newsletter and stay updated on the latest products and special offers! Also first 500 people to subscribe get 20% off on their next purchase.
      </p>
      <form onSubmit={onSubmitHandler} className='w-full am:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required />
        <button type='submit' className='bg-black text-white px-8 text-xs py-4 cursor-pointer transition-all duration-300 hover:font-bold'>
            SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox
