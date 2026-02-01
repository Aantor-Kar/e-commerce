import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT '} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever was born out of passion for innovation and a desire to revolutionize the online fashion industry. Forever is an innovative e-commerce company dedicated to making online shopping seamless, personalized, and joyful for customers worldwide. At its core, Forever combines cutting-edge technology with customer-centric service to offer a curated selection of high-quality products across fashion, electronics, home goods, and lifestyle categories.</p>
          <p>Its intuitive platform enables effortless browsing, secure checkout, and fast delivery, while advanced data analytics tailor recommendations to individual preferences. Forever values sustainability, partnering with ethical brands and reducing environmental impact through thoughtful packaging.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Committed to trust and transparency, the company provides responsive support and hassle-free returns. Forever’s mission is to redefine digital retail with reliability, convenience, and delight in every purchase.</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY '} text2={'CHOOSE US?'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='flex-1 border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-lg'>Quality Assurance:</b>
          <p className='text-gray-600'>Quality assurance ensures that every product meets defined standards of reliability, performance, and safety before reaching customers. It focuses on preventing defects through systematic checks, testing, and continuous process improvement.
          </p>
        </div>
        <div className='flex-1 border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-lg'>Convenience:</b>
          <p className='text-gray-600'>Convenience is about making every interaction simple, fast, and effortless for the customer. It saves time by offering easy navigation, quick access to services, and smooth processes. By reducing complexity, convenience enhances the overall experience and satisfaction.
          </p>
        </div>
        <div className='flex-1 border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-lg'>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Exceptional customer service is about understanding customer needs and responding with care, speed, and professionalism. It builds strong relationships by providing clear communication, timely support, and effective solutions.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About
