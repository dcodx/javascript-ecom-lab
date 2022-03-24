import React from 'react'
import { MdLocalShipping, MdSupportAgent } from 'react-icons/md'
import { GrMoney } from 'react-icons/gr'
import { IoPricetag } from 'react-icons/io5'

export default function Guarante() {
    return (
        <div className="py-5 py-lg-6 bg-gray-100">
            <div className="container">
                <div className="row">
                    <div className="service-section col-lg-3 col-sm-6">
                        <MdLocalShipping size={30} />
                        <div className="service-text">
                            <p className="text-sm mb-1 fw-bold">Free shipping &amp; return</p>
                            <p className="text-muted fw-light text-sm mb-0">Free Shipping over $300</p>
                        </div>
                    </div>
                    <div className="service-section col-lg-3 col-sm-6">
                        <GrMoney size={30} />
                        <div className="service-text">
                            <p className="text-sm mb-1 fw-bold">Money back guarantee</p>
                            <p className="text-muted fw-light text-sm mb-0">30 Days Guarantee</p>
                        </div>
                    </div>
                    <div className="service-section col-lg-3 col-sm-6">
                        <IoPricetag size={30} />
                        <div className="service-text fw-bold">
                            <p className="text-sm mb-1">Best prices</p>
                            <p className="text-muted fw-light text-sm mb-0">Always the best prices</p>
                        </div>
                    </div>
                    <div className="service-section col-lg-3 col-sm-6">
                        <MdSupportAgent size={30} />
                        <div className="service-text fw-bold">
                            <p className="text-sm mb-1">000-000-000</p>
                            <p className="text-muted fw-light text-sm mb-0">24/7 Available Support</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
