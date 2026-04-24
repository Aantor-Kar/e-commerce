import React from 'react'
import { Link } from 'react-router-dom'
import { heroSpotlight } from '../assets/assets'

const Hero = () => {
  const [primaryImage, secondaryImage, tertiaryImage] = heroSpotlight

  return (
    <div className='hero-glow theme-surface mt-8 flex flex-col overflow-hidden sm:flex-row'>
        {/* Left Section */}
        <div className='flex w-full items-center justify-center px-6 py-12 sm:w-1/2 sm:px-10 lg:px-14'>
            <div className='max-w-xl'>
                <div className='theme-chip'>
                    <span className='glass-dot'></span>
                    Amazor Night Edit
                </div>
                <p className='mt-6 text-xs uppercase tracking-[0.38em] text-slate-300 sm:text-sm'>Buy essentials</p>
                <h1 className='prata-regular mt-4 text-5xl leading-[0.92] text-white sm:text-6xl lg:text-7xl'>Elevate your every look.</h1>
                <p className='theme-copy mt-5 max-w-lg text-sm leading-7 sm:text-base'>
                    Discover sleek silhouettes, elevated layering pieces, and standout drops curated for a sharper, moodier Amazor storefront.
                </p>
                <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                    <Link to='/collection' className='theme-button px-7 py-3 text-center text-xs sm:text-sm'>
                        SHOP AMAZOR
                    </Link>
                    <Link to='/about' className='theme-button-secondary px-7 py-3 text-center text-xs sm:text-sm'>
                        DISCOVER THE EDIT
                    </Link>
                </div>
                <div className='mt-10 grid grid-cols-3 gap-3 text-left'>
                    <div className='theme-soft-card px-4 py-4'>
                        <p className='text-2xl font-semibold text-white'>24/7</p>
                        <p className='theme-copy mt-1 text-xs uppercase tracking-[0.22em]'>Style support</p>
                    </div>
                    <div className='theme-soft-card px-4 py-4'>
                        <p className='text-2xl font-semibold text-white'>200+</p>
                        <p className='theme-copy mt-1 text-xs uppercase tracking-[0.22em]'>Curated picks</p>
                    </div>
                    <div className='theme-soft-card px-4 py-4'>
                        <p className='text-2xl font-semibold text-white'>7 Day</p>
                        <p className='theme-copy mt-1 text-xs uppercase tracking-[0.22em]'>Easy returns</p>
                    </div>
                </div>
            </div>
        </div>
        {/* Right Section */}
        <div className='w-full p-6 sm:w-1/2 sm:p-8 lg:p-10'>
            <div className='grid min-h-[340px] grid-cols-2 gap-4'>
                <div className='theme-image-frame row-span-2'>
                    <img className='h-full w-full object-cover' src={primaryImage} alt="Amazor featured fashion look" />
                </div>
                <div className='theme-image-frame'>
                    <img className='h-full w-full object-cover' src={secondaryImage} alt="Amazor seasonal essentials" />
                </div>
                <div className='theme-image-frame'>
                    <img className='h-full w-full object-cover' src={tertiaryImage} alt="Amazor outerwear collection" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero
