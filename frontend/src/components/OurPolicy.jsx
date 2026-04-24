import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='grid gap-6 py-20 text-center text-xs sm:grid-cols-3 sm:text-sm md:text-base'>
      <div className='theme-card px-6 py-8'>
        <div className='mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900/80'>
          <img className='theme-icon-accent w-8' src={assets.exchange_icon} alt="" />
        </div>
        <p className='font-semibold text-slate-100'>Easy Exchange Policy</p>
        <p className='theme-copy mt-2'>We offer a hassle-free exchange policy.</p>
      </div>
      <div className='theme-card px-6 py-8'>
        <div className='mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900/80'>
          <img className='theme-icon-accent w-8' src={assets.quality_icon} alt="" />
        </div>
        <p className='font-semibold text-slate-100'>7 Days Return Policy</p>
        <p className='theme-copy mt-2'>We provide 7 days return policy.</p>
      </div>
      <div className='theme-card px-6 py-8'>
        <div className='mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900/80'>
          <img className='theme-icon-accent w-8' src={assets.support_img} alt="" />
        </div>
        <p className='font-semibold text-slate-100'>Best Customer Support</p>
        <p className='theme-copy mt-2'>We provide 24/7 customer support.</p>
      </div>
    </div>
  )
}

export default OurPolicy
