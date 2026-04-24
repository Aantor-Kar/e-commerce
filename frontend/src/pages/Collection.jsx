import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilters = () => {
    let productsCopy = products.slice();

    if (showSearch && search.length > 0) {
      productsCopy = productsCopy.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(product => category.includes(product.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(product => subCategory.includes(product.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    const fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilters();
        break;
    }
  };

  useEffect(() => {
    applyFilters();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType, products]);

  return (
    <div className='flex flex-col gap-4 border-t border-slate-800/70 pt-10 sm:flex-row sm:gap-10'>
      <div className='min-w-60'>
        <p onClick={() => setShowFilters(!showFilters)} className='my-2 flex items-center gap-3 text-xl text-slate-100'>
          FILTERS
          <img className={`theme-icon h-3 cursor-pointer sm:hidden ${showFilters ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        <div className={`theme-card mt-6 px-5 py-4 ${showFilters ? 'block' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium tracking-[0.18em] text-slate-100'>CATEGORIES</p>
          <div className='theme-copy flex flex-col gap-2 text-sm font-light'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

        <div className={`theme-card my-5 px-5 py-4 ${showFilters ? 'block' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium tracking-[0.18em] text-slate-100'>TYPE</p>
          <div className='theme-copy flex flex-col gap-2 text-sm font-light'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <div className='mb-4 flex justify-between text-base sm:text-2xl'>
          <Title text1={"ALL "} text2={"COLLECTIONS"} />
          <select onChange={(e) => setSortType(e.target.value)} className='theme-select px-4 py-2 text-sm'>
            <option value="relevant">Sort by: Relevance</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4'>
          {filterProducts.map((product, index) => (
            <ProductItem key={index} id={product._id} name={product.name} price={product.price} image={product.image} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collection
