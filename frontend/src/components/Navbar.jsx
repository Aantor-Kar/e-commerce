import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const [visible, setVisible] = React.useState(false);
    const { setShowSearch, getCartCount, token, navigate, setToken, setCartItems } = useContext(ShopContext)
    const logout = () => {
        navigate('/login');
        setToken('');
        setCartItems({});
        localStorage.removeItem('token');
    }

    const handleSearch = () => {
        navigate('/collection');
        setShowSearch(true);
    }

    return (
        <div className='flex items-center  justify-between py-5 font-medium'>
            <Link to='/'>
                <img src={assets.logo} className='w-36' alt="" />
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink className='flex flex-col items-center gap-1 ' to='/'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink className='flex flex-col items-center gap-1 ' to='/collection'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink className='flex flex-col items-center gap-1 ' to='/about'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink className='flex flex-col items-center gap-1 ' to='/contact'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={handleSearch} src={assets.search_icon} className='w-5 cursor-pointer' alt="search" />
                <div className='group relative'>
                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="profile" />
                    {token &&
                        <div className='absolute dropdown-menu pt-4 right-0 transition-all duration-200 ease-out opacity-0 translate-y-2 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto origin-top-right'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-50 text-gray-700 rounded-md shadow-lg'>
                                <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black hover:font-bold'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black hover:font-bold'>Orders</p>
                                <p onClick={() => logout()} className='cursor-pointer hover:text-black hover:font-bold'>Logout</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5 cursor-pointer' alt="cart" />
                    <p className='absolute right-[-5px] bottom-[-5px] bg-black text-white aspect-square w-4 rounded-full text-center leading-4 text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="menu" />
            </div>
            {/* Sidebar for mobile view */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p className='cursor-pointer'>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>


                </div>
            </div>
        </div>
    )
}

export default Navbar
