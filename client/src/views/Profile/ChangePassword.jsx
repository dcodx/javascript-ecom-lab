import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik';
import { useUser } from '../../context/UserContext'
import axios from '../../axios'
import Swal from 'sweetalert2'

export default function ChangePassword() {

    const { user, err, setErr } = useUser()

    const initialValues = {
        currentPass: '',
        newPass: '',
        confirmNewPass: ''
    }

    const formSchema = Yup.object().shape({
        currentPass: Yup.string().min(8, 'Must have at least 8 characters').required('Required'),
        newPass: Yup.string().min(8, 'Must have at least 8 characters').notOneOf([Yup.ref('currentPass'), null], 'New password must be different than the old one').required('Required'),
        confirmNewPass: Yup.string().oneOf([Yup.ref('newPass'), null], 'New passwords must match')
    })

    const submit = async (values, { resetForm }) => {
        const { confirmNewPass, currentPass, newPass } = values

        const { data } = await axios.post('/changepass', { id: user.id, confirmNewPass, currentPass, newPass })

        if (data === 'incorrect') return setErr(data)

        setErr(false)
        resetForm()
        Swal.fire('Good Job!', 'Password changed successfully', 'success')
    }

    return (
        <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={submit} >
            {
                ({ errors, touched }) => (
                    <Form>
                        <Field name="currentPass" className='form-control mt-3' placeholder='Current password' />
                        {errors.currentPass && touched.currentPass && <div className='error'>{errors.currentPass}</div>}

                        <Field name="newPass" className='form-control mt-3' placeholder='New password' />
                        {errors.newPass && touched.newPass && <div className='error'>{errors.newPass}</div>}

                        <Field name="confirmNewPass" className='form-control mt-3' placeholder='Confirm new password' />
                        {errors.confirmNewPass && touched.confirmNewPass && <div className='error'>{errors.confirmNewPass}</div>}

                        {err === 'incorrect' ? <div className='error mt-2'>Password incorrect</div> : null}

                        <button type="submit" className='w-100 btn btn-dark mt-3'>Change Password</button>
                    </Form>
                )
            }
        </Formik>
    )
}
