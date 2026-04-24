import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='border-t border-slate-800/70 pt-8 text-center text-2xl'>
        <Title text1={'ABOUT '} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col gap-16 md:flex-row'>
        <img className='theme-image-frame w-full md:max-w-[450px]' src={assets.about_img} alt="About Amazor" />
        <div className='theme-card flex flex-col justify-center gap-6 p-8 md:w-2/4 theme-copy'>
          <p>Amazor was built from a desire to make online shopping feel sharper, smoother, and more immersive. We combine premium product curation with a modern digital storefront so customers can move from discovery to checkout without friction.</p>
          <p>From statement fashion to everyday essentials, Amazor focuses on quality, reliability, and a polished buying experience. Every detail is designed to feel effortless, from fast delivery and secure checkout to personalized browsing and responsive support.</p>
          <b className='text-slate-100'>Our Mission</b>
          <p>Amazor exists to redefine digital retail with confidence, convenience, and a distinctive point of view. We want every order to feel elevated, dependable, and worth coming back for.</p>
        </div>
      </div>
      <div className='py-4 text-4xl'>
        <Title text1={'WHY '} text2={'CHOOSE US?'} />
      </div>
      <div className='mb-20 flex flex-col gap-5 text-sm md:flex-row'>
        <div className='theme-card flex flex-1 flex-col gap-5 px-10 py-8 sm:py-20 md:px-16'>
          <b className='text-lg text-slate-100'>Quality Assurance:</b>
          <p className='theme-copy'>Quality assurance ensures that every product meets defined standards of reliability, performance, and safety before reaching customers. It focuses on preventing defects through systematic checks, testing, and continuous process improvement.</p>
        </div>
        <div className='theme-card flex flex-1 flex-col gap-5 px-10 py-8 sm:py-20 md:px-16'>
          <b className='text-lg text-slate-100'>Convenience:</b>
          <p className='theme-copy'>Convenience is about making every interaction simple, fast, and effortless for the customer. It saves time by offering easy navigation, quick access to services, and smooth processes. By reducing complexity, convenience enhances the overall experience and satisfaction.</p>
        </div>
        <div className='theme-card flex flex-1 flex-col gap-5 px-10 py-8 sm:py-20 md:px-16'>
          <b className='text-lg text-slate-100'>Exceptional Customer Service:</b>
          <p className='theme-copy'>Exceptional customer service is about understanding customer needs and responding with care, speed, and professionalism. It builds strong relationships by providing clear communication, timely support, and effective solutions.</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About
