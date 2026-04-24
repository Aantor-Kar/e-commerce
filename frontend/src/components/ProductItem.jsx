import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price}) => {
    const {currency} = useContext(ShopContext);
  return (
    <Link className='product-card theme-card' to={`/product/${id}`}>
      <div className='theme-image-frame aspect-[4/5]'>
        <img src={image[0]} alt={name} className='h-full w-full object-cover' />
      </div>
      <p className='pt-4 pb-1 text-sm text-slate-100'>{name}</p>
      <p className='text-sm font-medium text-cyan-300'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
