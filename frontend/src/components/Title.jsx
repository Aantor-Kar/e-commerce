import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='mb-3 inline-flex items-center gap-3'>
      <p className='font-semibold tracking-[0.26em] text-slate-100'>{text1}
        <span className='text-cyan-300'>{text2}</span>
      </p>
      <p className='theme-divider h-[2px] w-8 rounded-full sm:w-12'></p>
    </div>
  )
}

export default Title
