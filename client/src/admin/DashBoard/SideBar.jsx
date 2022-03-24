import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { HiShoppingCart } from 'react-icons/hi'
import { BiSupport } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import { AiFillDashboard } from 'react-icons/ai'
import { MdReviews } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function SideBae({ open, setOpen, setTab, tab }) {


    return (
        <div className={`nav text-white ${open ? 'open_nav' : null}`} >
            <span onClick={() => setOpen(false)} className='close_nav'>
                <IoMdClose size={25} />
            </span>
            <Link to='/' className='text-white' >
                <h2 className='px-3 pt-4 pb-2'>BESTSHOP</h2>
            </Link>
            <div className='nav_inner py-4 '>
                <span onClick={() => setTab('Dashboard')} className={`nav_item ${tab === 'Dashboard' && 'active_item'}`}>
                    <AiFillDashboard size={20} />
                    <span className='ms-3'>Dashboard</span>
                </span>
                <span onClick={() => setTab('Users')} className={`nav_item ${tab === 'Users' && 'active_item'}`}>
                    <FaUsers size={20} />
                    <span className='ms-3'>Users</span>
                </span>
                <span onClick={() => setTab('Products')} className={`nav_item ${tab === 'Products' && 'active_item'}`}>
                    <HiShoppingCart size={20} />
                    <span className='ms-3'>Products</span>
                </span>
                <span onClick={() => setTab('Orders')} className={`nav_item ${tab === 'Orders' && 'active_item'}`}>
                    <FaMoneyCheckAlt size={20} />
                    <span className='ms-3'>Orders</span>
                </span>
                <span onClick={() => setTab('Reviews')} className={`nav_item ${tab === 'Reviews' && 'active_item'}`}>
                    <MdReviews size={20} />
                    <span className='ms-3'>Reviews</span>
                </span>
                <span onClick={() => setTab('Contact')} className={`nav_item ${tab === 'Contact' && 'active_item'}`}>
                    <BiSupport size={20} />
                    <span className='ms-3'>Contact</span>
                </span>
            </div>
        </div>
    )
}
