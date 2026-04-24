import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if(location.pathname.includes('collection')){
            setVisible(true);
        }else{
            setVisible(false);
        }
    },[location])

  return showSearch && visible ? (
    <div className='my-4 border-y border-slate-800/70 bg-slate-950/40 text-center backdrop-blur-md'>
      <div className='theme-panel mx-3 my-5 inline-flex w-3/4 items-center justify-center gap-3 px-5 py-3 sm:w-1/2'>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' className='flex-1 bg-inherit text-sm outline-none' />
        <img className='theme-icon w-4' src={assets.search_icon} alt="" />
      </div>
      <img onClick={()=>setShowSearch(false)} className='theme-icon mb-5 inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
    </div>
  ):null
}

export default Searchbar
