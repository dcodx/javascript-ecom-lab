import React, { useState, useEffect } from 'react'
import axios from '../../axios'

export default function Contact() {

  const [contacts, setContacts] = useState([])

  useEffect(() => {
    const getContacts = async () => {
      const { data } = await axios.get('/contacts')
      setContacts(data)
    }

    getContacts()
  }, [])


  return (
    <div>
      {
        contacts.length
          ? <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">firstname</th>
                  <th scope="col">lastname</th>
                  <th scope="col">email</th>
                  <th scope="col">subject</th>
                  <th scope="col">message</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  contacts.map(contact => (
                    <tr key={contact.id}>
                      <td>{contact.id}</td>
                      <td>{contact.firstname}</td>
                      <td>{contact.lastname}</td>
                      <td>{contact.email}</td>
                      <td>{contact.subject}</td>
                      <td>{contact.message}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </div>
          : <p className='text-muted py-4'>No contacts in the database</p>
      }


    </div>
  )
}