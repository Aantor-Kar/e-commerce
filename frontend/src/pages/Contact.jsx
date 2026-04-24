import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='border-t border-slate-800/70 pt-10 text-center text-2xl'>
        <Title text1={'CONTACT '} text2={'US'} />
      </div>
      <div className='my-10 mb-28 flex flex-col justify-center gap-10 md:flex-row'>
        <img className='theme-image-frame w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact Amazor" />
        <div className='theme-card flex flex-col items-start justify-center gap-6 p-8'>
          <p className='text-xl font-semibold text-slate-100'>Our Store</p>
          <p className='theme-copy'>FC-80 Ruman Apartment <br /> Narayantala West, Baguiati, Kolkata-700059</p>
          <p className='theme-copy'>Tel: (+91) 123-4567 <br /> Email: hello@amazor.com</p>
          <p className='text-xl font-semibold text-slate-100'>Careers at Amazor</p>
          <p className='theme-copy'>Learn more about our teams and job openings.</p>
          <button className='theme-button-secondary cursor-pointer px-8 py-4 text-sm'>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact
