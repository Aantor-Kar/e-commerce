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
    <div className='border-t-2 border-slate-800/70 pt-10 opacity-100 transition-opacity duration-500 ease-in'>
      <div className='flex flex-col gap-12 sm:flex-row sm:gap-12'>
        <div className='flex flex-1 flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex w-full justify-between overflow-x-auto sm:w-[18.7%] sm:flex-col sm:justify-normal sm:overflow-y-scroll'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`theme-image-frame w-[24%] shrink-0 cursor-pointer sm:mb-3 sm:w-full ${image === item ? 'theme-ring' : ''}`}
                alt={productData.name}
              />
            ))}
          </div>
          <div className='theme-image-frame w-full sm:w-[80%]'>
            <img src={image} className='h-auto w-full' alt={productData.name} />
          </div>
        </div>

        <div className='theme-card flex-1 p-8'>
          <h1 className='mt-2 text-2xl font-medium text-slate-100'>{productData.name}</h1>
          <div className='mt-2 flex items-center gap-1'>
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium text-cyan-300'>{currency}{productData.price}</p>
          <p className='theme-copy mt-5 md:w-4/5'>{productData.description}</p>

          <div className='my-8 flex flex-col gap-4'>
            <p className='text-slate-100'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} key={index} className={`theme-button-secondary cursor-pointer px-4 py-2 ${size === item ? 'theme-ring' : ''}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => addToCart(productData._id, size)} className='theme-button cursor-pointer px-8 py-3 text-sm'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />

          <div className='theme-copy mt-5 flex flex-col gap-1 text-sm'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available for this product.</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      <div className='mt-20'>
        <div className='mb-2 flex gap-1'>
          <b className='theme-soft-card px-5 py-3 text-sm text-slate-100'>Description</b>
          <p className='theme-soft-card px-5 py-3 text-sm theme-copy'>Reviews (122)</p>
        </div>
        <div className='theme-card flex flex-col gap-4 px-6 py-6 text-sm theme-copy'>
          <p>A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment. Soft, breathable, and effortlessly stylish, this piece is designed for all-day comfort. Crafted with premium fabric and a relaxed fit, it is perfect for everyday outings, casual meetups, or laid-back weekends.</p>
          <p>Designed to flatter and flow, this outfit blends elegance with comfort. The refined stitching, smooth texture, and modern silhouette make it ideal for both casual and semi-formal occasions. A perfect balance of sophistication and comfort, this garment features a tailored fit with a contemporary edge. Made from high-quality material, it offers durability, breathability, and timeless style. Stay warm without compromising on style. This winter essential is crafted with insulating fabric, a cozy inner lining, and a sleek outer finish to keep you comfortable in colder weather.</p>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
