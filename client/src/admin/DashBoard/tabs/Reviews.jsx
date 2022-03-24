import React, { useState, useEffect } from 'react'
import axios from '../../axios'
import _ from 'lodash'
import { AiFillStar } from 'react-icons/ai'

export default function Reviews() {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const getReviews = async () => {
            const { data } = await axios.get('/reviews')
            setReviews(data)
        }

        getReviews()
    }, [])


    return (
        <div>
            {
                reviews.length
                    ? <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product ID</th>
                                    <th scope="col">User ID</th>
                                    <th scope="col">Review</th>
                                    <th scope="col">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reviews.map(review => (
                                        <tr key={review.id}>
                                            <td>{review.id}</td>
                                            <td>{review.productId}</td>
                                            <td>{review.userId}</td>
                                            <td>{review.desc}</td>
                                            <td>
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
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                    : <p className='text-muted py-4'>No reviews in the database</p>
            }


        </div>
    )
}
