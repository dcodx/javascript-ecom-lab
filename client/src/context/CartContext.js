import React, { useContext, useReducer, createContext, useState } from 'react'
import { useUser } from './UserContext'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext(null)


const initialState = {
    cart: localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : []
}

const reducer = (state, action) => {
    let updatedCart = []

    switch (action.type) {
        case 'ADD':
            const product = action.payload
            const exist = state.cart.filter(p => p.id === product.id)
            if (exist[0]) {
                updatedCart = state.cart.map(p =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                )
                localStorage.setItem('cart', JSON.stringify(updatedCart))
                return { cart: updatedCart }
            }
            product.quantity = 1
            updatedCart = [...state.cart, product]

            localStorage.setItem('cart', JSON.stringify(updatedCart))

            return { cart: updatedCart }
        case 'REMOVE':
            updatedCart = state.cart.filter(p => p.id !== action.payload)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return { cart: updatedCart }


        case 'INCREASE_QTY':
            const { id, qty } = action.payload
            updatedCart = state.cart.map(p =>
                p.id === id
                    ? { ...p, quantity: qty }
                    : p
            )
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return { cart: updatedCart }

        case 'CLEAR':
            localStorage.removeItem('cart')
            return { cart: [] }

        default:
            return state
    }
}

export const CartProvider = ({ children }) => {

    const navigate = useNavigate()

    const [state, dispatch] = useReducer(reducer, initialState)


    const [loading, setLoading] = useState(false)

    const { user } = useUser()

    const addToCart = (product) => {
        if (!user) return navigate('/login')

        setLoading(true)
        dispatch({ type: 'ADD', payload: product })

        setLoading(false)
        toast.success(`${product.name} added to cart`, { autoClose: 500 })
    }

    const removeFromCart = (id) => {
        setLoading(true)
        dispatch({ type: 'REMOVE', payload: id })

        setLoading(false)
        toast.success(`Removed from cart`, { autoClose: 500 })
    }




    return (
        <CartContext.Provider
            value={{
                state, dispatch,
                loading, setLoading,
                addToCart, removeFromCart
            }}
        >
            <ToastContainer />
            {children}
        </CartContext.Provider>
    )
}



export const useCart = () => {
    return useContext(CartContext)
}