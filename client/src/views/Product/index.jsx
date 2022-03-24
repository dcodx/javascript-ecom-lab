import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import _ from 'lodash'
import { AiFillStar } from 'react-icons/ai'
import { useCart } from '../../context/CartContext'
import { useEffect } from 'react'
import axios from '../../axios'
import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import ReactStars from "react-rating-stars-component";
import { toast } from 'react-toastify';


export default function Product() {
    const navigate = useNavigate()
    const { id } = useParams()


    const { loading, addToCart } = useCart()
    const { user } = useUser()

    const [product, setProduct] = useState({})
    const [reviews, setReviews] = useState([])


    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get(`/product/${id}`)
            if (!data.product) return navigate('/')
            setProduct(data.product)
            setReviews(data.reviews)

        }
        getProduct()
    }, [id, navigate])

    const [reviewText, setReviewText] = useState('')
    const [stars, setStars] = useState(0)

    const addReview = async () => {

        if (!reviewText) return
        if (stars === 0) return

        const { data } = await axios.post('/addReview', {
            productId: product.id,
            userId: user.id,
            desc: reviewText,
            stars: stars,
        })

        if (data === 'exist') return toast.error('You can add only 1 review', {
            position: 'bottom-left',
            theme: 'dark'
        })

        if (data === 'cantreview') return toast.error('You need to buy this product first', {
            position: 'bottom-left',
            theme: 'dark'
        })

        setReviews(prev => [...prev, {
            productId: product.id,
            fullname: user.fullname,
            desc: reviewText,
            stars: stars,
        }])

        setReviewText('')
        toast.success('Your Review Has been submited', {
            position: 'bottom-left',
            theme: 'dark'
        })
    }


    return (
        <Container className='py-5'>
            <h3>Product Details</h3>
            <b className='d-flex align-items-center'>
                <Link to='/'>Home</Link>
                <span className='mx-2' >{'>'}</span>
                <small className='text-muted text-sm'>{product.name}</small>
            </b>
            <div className='row py-5 product'>
                <div className='col-12 col-md-6'>
                    <img src={product.img} alt={product.img} style={{ maxWidth: '100%' }} />
                </div>
                <div className='pt-4 order-1 order-lg-2 ms-lg-auto col-xl-5 col-md-6'>
                    <span>{product.id}</span>
                    <h1 className='mb-4'>{product.name}</h1>
                    <div className='mb-4 d-flex justify-content-between'>
                        <span className='h4 fw-light' >${Number(product.price).toFixed(2)}</span>
                        <div>
                            {
                                _.times(product.stars, (time) => (
                                    <AiFillStar key={time} size={20} color='#fad300' />
                                ))
                            }
                            {
                                5 - product.stars > 0 ? _.times(5 - product.stars, (t) => (
                                    <AiFillStar key={t} size={20} color='#dedede' />
                                )) : null
                            }
                        </div>
                    </div>
                    <p className='mb-4 text-muted'>
                        {product.desc}
                    </p>
                    <button onClick={() => addToCart(product)} className='w-100 d-flex align-items-center justify-content-center btn btn-lg btn-dark'>
                        <span>
                            {
                                loading
                                    ? <Spinner animation="border" variant="light" size="md" />
                                    : 'ADD TO CART'
                            }
                        </span>
                    </button>
                </div>
            </div>
            <div className='my-4 h5 text-muted'>Reviews</div>
            <div className='row mb-4'>
                {
                    reviews.map(review => (
                        <div key={review.id} className='col-md-6 px-2'>
                            <div className=' review py-2 px-3 rounded mb-2 shadow-sm border'>
                                <div className='d-flex align-items-center justify-content-between mb-2'>
                                    <span className='fw-bold name' >{review.fullname}</span>
                                    <div>
                                        {
                                            _.times(review.stars, (time) => (
                                                <AiFillStar key={time} size={20} color='#fad300' />
                                            ))
                                        }
                                        {
                                            5 - review.stars > 0 ? _.times(5 - review.stars, (t) => (
                                                <AiFillStar key={t} size={20} color='#dedede' />
                                            )) : null
                                        }
                                    </div>
                                </div>
                                <p>{review.desc}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                user
                    ? <>
                        <span className='text-muted'>Your Review</span>
                        <div>
                            <ReactStars
                                count={5}
                                onChange={(newRating) => { setStars(newRating) }}
                                value={stars}
                                size={24}
                                activeColor="#ffd700"
                            />
                            <textarea
                                value={reviewText}
                                onChange={({ target }) => setReviewText(target.value)}
                                className='form-control'
                            ></textarea>
                            <button onClick={addReview} className='btn btn-sm btn-outline-dark mt-2'>Add Review</button>
                        </div>
                    </>
                    : null
            }
        </Container>
    )
}
