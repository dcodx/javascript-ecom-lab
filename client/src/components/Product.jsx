import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'



export default function Product({ product }) {

  const { addToCart } = useCart()

  return (
    <Link to={`/product/${product.id}`} className='col-lg-3 col-md-4 col-6 mt-5'>
      <div className='arrivals_products'>
        <img src={product.img} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        <div className='arrivals_inner'>
          <button
            onClick={(e) => {
              e.preventDefault()
              addToCart(product)
            }}
            className='btn btn-dark rounded-0'>ADD TO CART</button>
        </div>
      </div>
      <div className='d-flex align-items-center justify-content-between mt-1'>
        <div className='d-flex flex-column'>
          <span className='mb-1 fw-bold'>{product.name}</span>
          <span className="text-gray-500 text-sm fw-bold">${product.price}</span>
        </div>
        <div onClick={(e) => {
          e.preventDefault()
          addToCart(product)
        }} className='addtocart_mobile'>
          <AiOutlineShopping size={30} />
        </div>
      </div>
    </Link>
  )
}
