import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Cart from './pages/Cart.jsx'
import Collection from './pages/Collection.jsx'
import Contact from './pages/Contact.jsx'
import Product from './pages/Product.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Orders from './pages/Orders.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import SearchBar from './components/SearchBar.jsx'
import { ToastContainer } from 'react-toastify';
import Verify from './pages/Verify.jsx'

const App = () => {
  return (
    <div className='app-shell px-4 pb-10 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer
        theme='dark'
        toastStyle={{
          background: 'rgba(8, 15, 28, 0.96)',
          color: '#e5eefc',
          border: '1px solid rgba(148, 163, 184, 0.16)'
        }}
      />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
