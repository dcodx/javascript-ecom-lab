import React from 'react'
import { Container } from 'react-bootstrap'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function Login() {

  const initialValues = {
    email: '',
    password: '',
  }


  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Must have at least 8 characters').required('Required'),
  })

  const { login, err } = useUser()

  const submit = (values) => {
    login(values)
  }

  return (
    <Container className='py-6'>
      <div className='forms mx-auto' >
        <h3>Login</h3>
        <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={submit} >
          {
            ({ errors, touched }) => (
              <Form>
                <Field name="email" className='form-control mt-3' placeholder='Email' />
                {errors.email && touched.email && <div className='error'>{errors.email}</div>}

                <Field name="password" className='form-control mt-3' placeholder='Password' />
                {errors.password && touched.password && <div className='error'>{errors.password}</div>}
                {err === 'incorrect' ? <div className='error'>Email or Password is incorrect</div> : null}
                
                <button type="submit" className='w-100 btn btn-dark mt-3'>Login</button>
              </Form>
            )
          }
        </Formik>
        <Link to='/register' className='register_btn w-100 btn btn-outline-dark mt-3'>Register</Link>
      </div>
    </Container>
  )
}
