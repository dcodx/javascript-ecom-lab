import React from 'react'
import Guarante from './Guarante'

export default function Footer() {
    return (
        <>
            <Guarante />
            <div className="py-4 fw-light text-muted">
                <div className="container">
                    <div className="align-items-center text-sm text-gray-500 row">
                        <div className="text-center text-lg-start col-lg-4">
                            <p className="mb-lg-0">© 2022 All rights reserved.</p>
                        </div>
                        <div className="col-lg-8">
                            <ul className="list-inline mb-0 mt-2 mt-md-0 text-center text-lg-end">
                                <li className="list-inline-item">
                                    <a className="text-reset" href="/">Terms &amp; Conditions </a>
                                </li>
                                <li className="list-inline-item">
                                    <a className="text-reset" href="/">Privacy &amp; cookies</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
