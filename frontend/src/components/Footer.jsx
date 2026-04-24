import React from 'react'
import { Link } from 'react-router-dom'
import BrandMark from './BrandMark'

const Footer = () => {
  return (
    <div className='mt-24'>
      <div className='theme-panel flex flex-col gap-14 px-6 py-10 text-sm sm:grid sm:grid-cols-[3fr_1fr_1fr] sm:px-10'>
        <div>
            <Link to='/'>
              <BrandMark compact />
            </Link>
            <p className='theme-copy mt-5 w-full max-w-lg leading-7'>
                Amazor blends premium essentials, sleek design, and a darker editorial edge to make every shopping session feel elevated. We keep the experience fast, reliable, and polished from first browse to final delivery.
            </p>
        </div>
        <div>
            <p className='mb-5 text-xl font-medium tracking-[0.18em] text-slate-100'>COMPANY</p>
            <ul className='theme-copy flex flex-col gap-2'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='mb-5 text-xl font-medium tracking-[0.18em] text-slate-100'>GET IN TOUCH</p>
            <ul className='theme-copy flex flex-col gap-2'>
                <li>+91-1234567890</li>
                <li>hello@amazor.com</li>
            </ul>
        </div>
      </div>
      <div className='theme-copy mt-6 text-center'>
        <hr />
        <p className='py-5 text-sm text-center'>&copy; Copyright 2026 Amazor.com. All rights reserved.</p>
      </div> 
    </div>
  )
}

export default Footer
