import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import axios from '../../axios'

export default function Contact() {

    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        subject: '',
        message: '',
    }

    const contactSchema = Yup.object().shape({
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        subject: Yup.string().required('Required'),
        message: Yup.string().min(10, 'Must have at least 10 characters').required('Required'),
    })

    const submit = async (values, { resetForm }) => {
        await axios.post('/contact', { values })
        Swal.fire('Sent !', 'We will contact you as soon as possible', 'success')
        resetForm()
    }

    return (
        <div className='container'>
            <div className='py-5 mx-auto contact_form'>
                <div className='py-4 d-flex flex-column align-items-center justify-content-center'>
                    <h5>STAY CONNECTED WITH US</h5>
                    <p className='text-muted' >Lorem ipsum dolor sit amet.</p>
                </div>
                <Formik initialValues={initialValues} validationSchema={contactSchema} onSubmit={submit} >
                    {
                        ({ errors, touched }) => (
                            <Form>
                                <div className='row' >
                                    <div className='col-6'>
                                        <Field name='firstname' className='form-control mt-3' placeholder='First name' />
                                        {errors.firstname && touched.firstname && <div className='error'>{errors.firstname}</div>}

                                        <Field name='email' className='form-control mt-3' placeholder='Email' />
                                        {errors.email && touched.email && <div className='error'>{errors.email}</div>}
                                    </div>
                                    <div className='col-6'>
                                        <Field name='lastname' className='form-control mt-3' placeholder='Last Name' />
                                        {errors.lastname && touched.lastname && <div className='error'>{errors.lastname}</div>}

                                        <Field name='subject' className='form-control mt-3' placeholder='Subject' />
                                        {errors.subject && touched.subject && <div className='error'>{errors.subject}</div>}
                                    </div>
                                    <div className='col-12'>
                                        <Field name='message' as="textarea" placeholder='Message' className='form-control mt-3' rows={6} />
                                        {errors.message && touched.message && <div className='error'>{errors.message}</div>}
                                    </div>
                                </div>
                                <button type='submit' className='w-100 btn btn-dark mt-2' >SEND MESSAGE</button>
                            </Form>
                        )
                    }
                </Formik>


            </div>
        </div>
    )
}
