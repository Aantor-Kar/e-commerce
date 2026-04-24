import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add'
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'
const ADMIN_TOKEN_STORAGE_KEY = 'adminToken'
const LEGACY_SHARED_TOKEN_KEY = 'token'

const parseTokenPayload = (token) => {
  try {
    if (!token) {
      return null;
    }
    const base64 = token.split('.')[1];
    if (!base64) {
      return null;
    }
    const normalized = base64.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(normalized)
        .split('')
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

const getStoredAdminToken = () => {
  const storedAdminToken = localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
  if (storedAdminToken) {
    return storedAdminToken;
  }

  const legacyToken = localStorage.getItem(LEGACY_SHARED_TOKEN_KEY);
  const legacyPayload = parseTokenPayload(legacyToken);
  if (typeof legacyPayload === 'string' || (legacyPayload && typeof legacyPayload === 'object' && !legacyPayload.id)) {
    localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, legacyToken);
    return legacyToken;
  }

  return '';
}

function App() {
  const [token, setToken] = useState(getStoredAdminToken());
  useEffect(()=>{
    if (token) {
      localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
      const legacyToken = localStorage.getItem(LEGACY_SHARED_TOKEN_KEY);
      const legacyPayload = parseTokenPayload(legacyToken);
      if (typeof legacyPayload === 'string' || (legacyPayload && typeof legacyPayload === 'object' && !legacyPayload.id)) {
        localStorage.removeItem(LEGACY_SHARED_TOKEN_KEY);
      }
    }
  },[token])
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken} />
          <hr className="text-gray-400" />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }

    </div>
  )
}

export default App
