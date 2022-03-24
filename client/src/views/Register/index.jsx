import React from 'react'
import { Container } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function Login() {

  const initialValues = {
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  }


  const registerSchema = Yup.object().shape({
    fullname: Yup.string().min(5, 'Too Short!').max(30, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Must have at least 8 characters').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const { register, err } = useUser()

  const submit = (values) => {
    register(values)
  }

  return (
    <Container className='py-6'>
      <div className='forms mx-auto' >
        <h3>Register</h3>
        <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={submit} >
          {
            ({ errors, touched }) => (
              <Form>
                <Field name="fullname" className='form-control mt-3' placeholder='Full name' />
                {errors.fullname && touched.fullname && <div className='error'>{errors.fullname}</div>}

                <Field name="email" className='form-control mt-3' placeholder='Email' />
                {errors.email && touched.email && <div className='error'>{errors.email}</div>}
                {err === 'exist' ? <div className='error'>Email already exist</div> : null}

                <Field name="password" className='form-control mt-3' placeholder='Password' />
                {errors.password && touched.password && <div className='error'>{errors.password}</div>}

                <Field name="confirmPassword" className='form-control mt-3' placeholder='Confirm password' />
                {errors.confirmPassword && touched.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}

                <button type="submit" className='w-100 btn btn-dark mt-3'>Register</button>
              </Form>
            )
          }
        </Formik>
        <Link to='/login' className='register_btn w-100 btn btn-outline-dark mt-3'>Login</Link>
      </div>
    </Container>
  )
}
