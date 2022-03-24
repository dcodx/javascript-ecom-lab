import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import axios from '../../axios'
import { useUser } from '../../context/UserContext'
import { useState } from 'react';
import { useEffect } from 'react';


export default function ProfileInformations() {

  const { user, setUser } = useUser()

  const initialValues = {
    fullname: user.fullname,
    email: user.email
  }

  const formSchema = Yup.object().shape({
    fullname: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required')
  })


  const submit = async (values, { resetForm }) => {
    const { fullname, email } = values

    const { data } = await axios.post('/changeinfo', { fullname, email })

    localStorage.setItem('user', JSON.stringify(data))
    setUser(data)
    resetForm()
    Swal.fire('Good Job!', 'Profile informations changed successfully', 'success')
  }

  return (
    <Formik enableReinitialize initialValues={initialValues} validationSchema={formSchema} onSubmit={submit} >
      {
        ({ errors, touched }) => (
          <Form>
            <Field name="fullname" className='form-control mt-3' placeholder='Full name' />
            {errors.fullname && touched.fullname && <div className='error'>{errors.fullname}</div>}

            <Field name="email" className='form-control mt-3' placeholder='Email' />
            {errors.email && touched.email && <div className='error'>{errors.email}</div>}


            <button
              type="submit"
              className='w-100 btn btn-dark mt-3'
            >
              Update Profile
            </button>
          </Form>
        )
      }
    </Formik>
  )
}