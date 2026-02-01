import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  
 const fetchProductData = useCallback(async () => {
  products.forEach((item) => {
    if (item._id === productId) {
      setProductData(item);
      setImage(item.image[0]);
    }
  });
}, [products, productId]);

useEffect(() => {
  fetchProductData();
}, [fetchProductData]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Left Side - Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex gap-1 items-center mt-2'>
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button onClick={()=>setSize(item)} key={index} className={`py-2 px-4 bg-gray-100 cursor-pointer ${size === item ? 'border border-orange-500' : ''}`}>
                    {item}
                  </button>
                ))
              }
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id, size)} className='bg-black cursor-pointer text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available for this product.</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* Description & Reviews Section */}
      <div className='mt-20'>
        <div className='flex gap-1 mb-2'>
            <b className='border border-gray-500 px-5 py-3 text-sm'>Description</b>
            <p className='border border-gray-300 px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='border-1.5 border-gray-500 flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.Soft, breathable, and effortlessly stylish, this piece is designed for all-day comfort. Crafted with premium fabric and a relaxed fit, it’s perfect for everyday outings, casual meetups, or laid-back weekends.</p>
          <p>Designed to flatter and flow, this outfit blends elegance with comfort. The refined stitching, smooth texture, and modern silhouette make it ideal for both casual and semi-formal occasions. A perfect balance of sophistication and comfort, this garment features a tailored fit with a contemporary edge. Made from high-quality material, it offers durability, breathability, and timeless style. Stay warm without compromising on style. This winter essential is crafted with insulating fabric, a cozy inner lining, and a sleek outer finish to keep you comfortable in colder weather.</p>
        </div>
      </div>
      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
