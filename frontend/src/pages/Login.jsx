import React, { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, backendUrl } = useContext(ShopContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('userToken', response.data.token)
        } else {
          toast.error(response.data.message)
          setLoading(false)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('userToken', response.data.token)
        } else {
          toast.error(response.data.message)
          setLoading(false)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  }

  if (token) return <Navigate to='/' replace />;

  return (
    <form onSubmit={onSubmitHandler} className='theme-panel m-auto mt-14 flex w-[90%] flex-col items-center gap-4 px-6 py-10 text-slate-100 sm:max-w-96'>
      <div className='mb-2 mt-10 inline-flex items-center gap-2'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='theme-divider h-[2px] w-8 border-none' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='theme-input w-full rounded-xl px-3 py-3' placeholder='Name' required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='theme-input w-full rounded-xl px-3 py-3' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='theme-input w-full rounded-xl px-3 py-3' placeholder='Password' required />
      <div className='mt-[-8px] flex w-full justify-between text-sm theme-copy'>
        <p>Forgot your password?</p>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer text-slate-100'>Create Account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-slate-100'>Login Here</p>
        }
      </div>
      <button type="submit" disabled={loading} className={`theme-button mt-4 px-8 py-3 ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>{loading ? (currentState === 'Login' ? 'Signing In...' : 'Signing Up...') : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}</button>
    </form>
  )
}

export default Login
