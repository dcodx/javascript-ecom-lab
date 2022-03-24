import React from 'react'
import { useState } from 'react'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import '../style.css'
import SideBar from './SideBar'
import Users from './tabs/Users'
import Orders from './tabs/Orders'
import Products from './tabs/Products'
import Contact from './tabs/Contact'
import Main from './tabs/Main'
import Reviews from './tabs/Reviews'


export default function Dashboard() {

  const [tab, setTab] = useState('Dashboard')

  const [open, setOpen] = useState(false)

  return (
    <div className='dashboard'>

      <SideBar open={open} setOpen={setOpen} setTab={setTab} tab={tab} />

      <div className='container py-2 dash'>
        <span className='open_btn mb-2'>
          <h2 onClick={() => setTab('main')} className='mt-1'>{tab}</h2>
          <HiOutlineMenuAlt1 onClick={() => setOpen(true)} size={25} />
        </span>

        {
          tab === 'Dashboard' && <Main />
        }

        {
          tab === 'Users' && <Users />
        }
        {
          tab === 'Products' && <Products />
        }
        {
          tab === 'Orders' && <Orders />
        }
        {
          tab === 'Reviews' && <Reviews />
        }
        {
          tab === 'Contact' && <Contact />
        }

      </div>
    </div>
  )
}
