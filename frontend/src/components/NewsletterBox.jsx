import React from 'react'

const NewsletterBox = () => {
    const onSubmitHandler = (e) => {
        e.preventDefault();
    }
  return (
    <div className='theme-panel px-6 py-10 text-center sm:px-10'>
      <p className='text-3xl font-medium text-slate-100'>Subscribe now and get 20% off</p>
      <p className='theme-copy mt-3'>
        Subscribe to our newsletter and stay updated on the latest products and special offers! Also first 500 people to subscribe get 20% off on their next purchase.
      </p>
      <form onSubmit={onSubmitHandler} className='mx-auto my-6 flex w-full items-center gap-3 rounded-full border border-slate-700/60 px-3 py-2 sm:w-3/4'>
        <input className='theme-input w-full rounded-full px-4 py-3 sm:flex-1' type="email" placeholder='Enter your email' required />
        <button type='submit' className='theme-button px-8 py-4 text-xs cursor-pointer'>
            SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox
