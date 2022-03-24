import React from 'react'
import { Container } from 'react-bootstrap'
import Product from '../../components/Product'
import { useProducts } from '../../context/ProductsContext'

export default function Arrivals() {

    const { products } = useProducts()

    return (
        <Container className='py-6'>
            <div className="text-center mx-auto col-xl-8 col-lg-10 py-5">
                <h2 className="display-3 mb-5">New Arrivals</h2>
                <p className="lead text-muted mb-6">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections</p>
            </div>
            <div className='row arrivals_row'>
                {
                    products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))
                }
            </div>
        </Container>
    )
}
