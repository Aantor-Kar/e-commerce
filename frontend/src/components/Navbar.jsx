import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import BrandMark from './BrandMark'

const Navbar = () => {
    const [visible, setVisible] = React.useState(false);
    const { setShowSearch, getCartCount, token, navigate, setToken, setCartItems } = useContext(ShopContext)
    const logout = () => {
        navigate('/login');
        setToken('');
        setCartItems({});
        localStorage.removeItem('userToken');
    }

    const handleSearch = () => {
        navigate('/collection');
        setShowSearch(true);
    }

    return (
        <div className='theme-panel mt-6 flex items-center justify-between px-4 py-4 font-medium sm:px-6'>
            <Link to='/'>
                <BrandMark />
            </Link>
            <ul className='hidden sm:flex gap-6 text-sm tracking-[0.2em] text-slate-200'>
                <NavLink className='nav-link flex flex-col items-center gap-2' to='/'>
                    <p>HOME</p>
                    <hr className='hidden h-[2px] w-2/4 rounded-full border-none' />
                </NavLink>
                <NavLink className='nav-link flex flex-col items-center gap-2' to='/collection'>
                    <p>COLLECTION</p>
                    <hr className='hidden h-[2px] w-2/4 rounded-full border-none' />
                </NavLink>
                <NavLink className='nav-link flex flex-col items-center gap-2' to='/about'>
                    <p>ABOUT</p>
                    <hr className='hidden h-[2px] w-2/4 rounded-full border-none' />
                </NavLink>
                <NavLink className='nav-link flex flex-col items-center gap-2' to='/contact'>
                    <p>CONTACT</p>
                    <hr className='hidden h-[2px] w-2/4 rounded-full border-none' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={handleSearch} src={assets.search_icon} className='theme-icon w-5 cursor-pointer transition duration-300 hover:scale-110' alt="search" />
                <div className='group relative hidden md:block'>
                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='theme-icon w-5 cursor-pointer transition duration-300 hover:scale-110' alt="profile" />
                    {token &&
                        <div className='absolute dropdown-menu pt-4 right-0 transition-all duration-200 ease-out opacity-0 translate-y-2 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto origin-top-right'>
                            <div className='theme-soft-card flex w-40 flex-col gap-2 px-5 py-4 text-sm text-slate-200 shadow-lg'>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer transition hover:text-cyan-300'>Orders</p>
                                <p onClick={() => logout()} className='cursor-pointer transition hover:text-cyan-300'>Logout</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='theme-icon w-5 min-w-5 cursor-pointer transition duration-300 hover:scale-110' alt="cart" />
                    <p className='absolute right-[-6px] bottom-[-6px] aspect-square w-4 rounded-full bg-gradient-to-br from-cyan-300 to-amber-300 text-center text-[8px] leading-4 font-bold text-slate-950 shadow-md'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='theme-icon w-5 cursor-pointer sm:hidden' alt="menu" />
            </div>
            {/* Sidebar for mobile view */}
            <div className={`mobile-drawer absolute top-0 right-0 bottom-0 z-50 overflow-hidden transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-slate-200'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-4'>
                        <img className='theme-icon h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p className='cursor-pointer'>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='mobile-link py-3 pl-6 border cursor-pointer tracking-[0.18em]' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='mobile-link py-3 pl-6 border cursor-pointer tracking-[0.18em]' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='mobile-link py-3 pl-6 border cursor-pointer tracking-[0.18em]' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='mobile-link py-3 pl-6 border cursor-pointer tracking-[0.18em]' to='/contact'>CONTACT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='mobile-link py-3 pl-6 border cursor-pointer tracking-[0.18em]' to='/orders'>MY ORDERS</NavLink>
                    <NavLink onClick={() => {setVisible(false); logout();}} className='mobile-link py-3 pl-6 border cursor-pointer tracking-[0.18em]' to='/login'>LOGOUT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
