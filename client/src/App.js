import React from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './views/Home'
import Product from './views/Product'
import Login from './views/Login'
import Register from './views/Register'
import Cart from './views/Cart'
import { useUser } from './context/UserContext'
import Wrapper from './components/Wrapper'
import Products from './views/Products'
import DashBoard from './admin/DashBoard'
import Profile from './views/Profile'
import Contact from './views/Contact'

import './App.css'


export default function App() {


  const { user } = useUser()

  const { pathname } = useLocation()

  return (
    <Wrapper>
      {
        Number(user?.admin) === 1
          ? pathname !== '/dashboard' && <NavBar />
          : <NavBar />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/products' element={<Products />} />
        <Route path='/contact' element={<Contact />} />
        {
          user ? <>
            <Route path='/cart' element={<Cart />} />
            <Route path='profile' element={<Profile />} />
            {
              Number(user?.admin) === 1 && <>
                <Route path='/dashboard' element={<DashBoard />} />
              </>
            }
          </>
            : <>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </>
        }
        <Route path="*" element={<Home />} />
      </Routes>
      {
        Number(user?.admin) === 1
          ? pathname !== '/dashboard' && <Footer />
          : <Footer />
      }
    </Wrapper>
  )
}