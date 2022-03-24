import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import StripeCheckout from 'react-stripe-checkout';
import { useUser } from '../../context/UserContext';
import axios from '../../axios'
import _ from 'lodash'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export default function Cart() {

  const { state: { cart }, dispatch, removeFromCart } = useCart()

  const total = Number(_.sum(cart.map(p => p.price * p.quantity))).toFixed(2)

  const { user } = useUser()

  const navigate = useNavigate()

  const prds = cart.map(p => p.id)


  const onToken = async (token) => {

    await axios.post('/saveOrder', {
      token: token.id,
      total,
      date: new Date().getTime(),
      userId: user.id,
      products: prds.toString()
    })

    dispatch({ type: 'CLEAR' })

    navigate('/')

    Swal.fire({
      title: 'Your order is on the way',
      icon: 'success'
    })
  }

  const handleQty = (e, id) => {
    const qty = e.target.value
    dispatch({ type: 'INCREASE_QTY', payload: { id, qty } })
  }



  return (
    <section className="h-100">
      <div className="container h-100 py-5">
        <h3>Shopping Cart</h3>

        <div className="row py-3">

          <div className='col-lg-8 mb-3'>

            {
              cart.length ? cart.map(p => (
                <div key={p.id} className='border mb-3 p-1 row'>
                  <div className='col-sm-6 d-flex align-items-center'>
                    <img
                      src={p.img}
                      className="img-fluid rounded-3"
                      alt={p.name}
                      style={{ maxWidth: '60px' }}
                    />

                    <h6 style={{ maxWidth: '200px' }} className=' ms-2'>{p.name}</h6>
                  </div>


                  <div className='col-sm-6 d-flex  align-items-center mt-2 justify-content-between' >
                    <div>
                      <input
                        className='form-control form-control-sm'
                        type="number"
                        min={1}
                        max={20}
                        value={p.quantity}
                        onChange={(e) => handleQty(e, p.id)}
                      />
                    </div>
                    <span>${p.price}</span>
                    <button onClick={() => removeFromCart(p.id)} className='btn btn-sm' ><FaTrash color="#ef4444" /></button>
                  </div>

                </div>
              ))
                : <p className='text-muted'>Your Shopping Cart is Empty</p>
            }

          </div>



          {
            cart.length ? <div className='col-lg-4'>
              <div className="card">
                <div className="card-body">
                  <h4 className='mb-4'>Summary</h4>
                  <div className='d-flex align-items-center justify-content-between mb-3'>
                    <span>Items :</span>
                    <span>${total}</span>
                  </div>
                  <div className='d-flex align-items-center justify-content-between mb-4'>
                    <span>Shipping :</span>
                    <span>+${0}</span>
                  </div>
                  <h5 className='d-flex align-items-center justify-content-between mb-3'>
                    <span>TOTAL PRICE</span>
                    <span>${total}</span>
                  </h5>

                  <StripeCheckout
                    email={user.email}
                    token={onToken}
                    amount={total * 100}
                    stripeKey="pk_test_51Jpu7ZKwJxGhyCis4zSMiubBJ8u0hiGCOY5vOlQBlzbDEv42o3JJgx4ul4CgWg0jwWBFp0b7Dk0HE6yIeraklu3g00rSuvoseg"
                  >
                    <button type="button" className="btn btn-dark btn-block w-100">Proceed to Pay</button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
              : null

          }

        </div>
      </div>
    </section>
  )
}
