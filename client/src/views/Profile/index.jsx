import React from 'react'
import { Container } from 'react-bootstrap'
import { useUser } from '../../context/UserContext'
import ChangePassword from './ChangePassword'
import ProfileInformations from './ProfileInformations'


export default function Profile() {

    const { user: { fullname } } = useUser()

    return (
        <Container className='py-2'>
            <h3 className='py-5' >{fullname.toUpperCase()}'s Profile</h3>
            <div className='row'>
                <div className="col-md-6 mt-3">
                    <h4>Profile Informations</h4>
                    <ProfileInformations />
                </div>
                <div className="col-md-6 mt-3">
                    <h4>Change Password</h4>
                    <ChangePassword />
                </div>
            </div>
        </Container>
    )
}