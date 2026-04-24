import React from 'react'

const BrandMark = ({ compact = false }) => {
  return (
    <div className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`}>
      <div className='brand-mark__glyph'>A</div>
      <div>
        <p className='brand-mark__name'>Amazor</p>
        <p className='brand-mark__tag'>Curated for Legends</p>
      </div>
    </div>
  )
}

export default BrandMark
