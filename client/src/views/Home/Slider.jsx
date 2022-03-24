import React from 'react'
import { Carousel, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import bg1 from '../../assets/bg1.webp'
import bg2 from '../../assets/bg2.webp'
import bg3 from '../../assets/bg3.webp'

export default function Slider() {
    return (
        <Carousel variant="dark" interval={2000}>
            {
                data.map(({ id, bg, position, align, title, desc }) => (
                    <Carousel.Item key={id} >
                        <div
                            className='carousel_container'
                            style={{
                                background: `url(${bg})`,
                                backgroundPosition: position,
                                backgroundSize: 'cover',
                            }}
                        >


                            <Container>
                                <div
                                    className='desc'
                                    style={{
                                        alignItems: align
                                    }}
                                >
                                    <h1>{title}</h1>
                                    <p className='text-muted'>{desc}</p>
                                    <Link to='/products' className='btn btn-dark'>SHOP NOW</Link>
                                </div>
                            </Container>
                        </div>
                    </Carousel.Item>
                ))
            }
        </Carousel >
    )
}

const data = [
    { id: 1, bg: bg1, align: 'flex-start', position: 'right', title: 'Blouses & Tops', desc: 'The bedding was hardly able to cover it and seemed ready to slide off any moment' },
    { id: 2, bg: bg2, align: 'center', position: 'center', title: 'Spring Sale 2022', desc: 'BLUE & WHITE' },
    { id: 3, bg: bg3, align: 'flex-end', position: 'left', title: 'For ever occassion', desc: 'SNEAKERS' },
]
