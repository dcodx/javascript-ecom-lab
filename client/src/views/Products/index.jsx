import React from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Product from '../../components/Product'
import { useProducts } from '../../context/ProductsContext'

export default function Products() {

    const { products, searchProducts, searched } = useProducts()

    const [query, setQuery] = useState('')

    return (
        <Container className='py-5'>
            <div className='d-flex'>
                <input value={query} onChange={({ target }) => setQuery(target.value)} className='form-control border-dark border-end-0' placeholder='Search Key' />
                <button onClick={() => searchProducts(query)} className='btn btn-dark'>SEARCH</button>
            </div>
            {
                searched && <p className='py-2'>Results about : <span className='text-muted' >{searched}</span></p>
            }
            <div className='row arrivals_row'>
                {
                    products.length ? products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))
                        : <p className='text-muted py-4'>No products found</p>
                }
            </div>
        </Container>
    )
}