import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
                Forever is built on trust, quality, and timeless appeal. Our carefully curated collection ensures that every product meets high standards, giving you a shopping experience that goes beyond today—made to last forever. At Forever, customers come first. We’re committed to offering reliable products, fast service, and a shopping experience you’ll want to return to—again and again.
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91-1234567890</li>
                <li>contact@forever.com</li>
            </ul>
        </div>
      </div>
      <div className='text-center text-gray-600 mt-10'>
        <hr />
        <p className='py-5 text-sm text-center'>&copy; Copyright 2026@Forever.com. All rights reserved.</p>
      </div> 
    </div>
  )
}

export default Footer
