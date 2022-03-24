import React from 'react'
import { Navbar, Container, Nav, Badge } from 'react-bootstrap'
import { AiOutlineShopping } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { HiLogout } from 'react-icons/hi'


export default function NavBar() {

    const { state: { cart } } = useCart()
    const { user, logout } = useUser()

    const count = cart?.length

    return (
        <Navbar collapseOnSelect expand="lg" bg="light">
            <Container>
                <Link className='navbar-brand' to="/">BESTSHOP</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className='nav-link'>Home</Link>
                        <Link to="/products" className='nav-link'>Products</Link>
                        <Link to="/contact" className='nav-link'>Contact</Link>
                    </Nav>
                    <Nav>
                        {
                            user
                                ? <>
                                    <Link to='/profile' className='my-auto nav-link'>Hello, {user.fullname}</Link>

                                    {
                                        Number(user?.admin) === 1 ? <Link to='/dashboard' className='my-auto nav-link'>DashBoard</Link> : null
                                    }

                                    <Link to="/cart" className='nav-link'>
                                        <div className='shopping_cart'>
                                            <AiOutlineShopping size={30} />
                                            <Badge bg="dark">{count}</Badge>
                                        </div>
                                    </Link>
                                    <Link to='/' onClick={logout} className='my-auto nav-link'>
                                        <HiLogout size={23} />
                                    </Link>
                                </>
                                : <>
                                    <Link to="/login" className='nav-link'>
                                        Login
                                    </Link>
                                    <Link to="/register" className='nav-link'>
                                        Register
                                    </Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
