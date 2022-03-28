import React, { useState, useEffect } from 'react'
import axios from '../../axios'




export default function Contact() {

  const [contacts, setContacts] = useState([])
  const divRef = React.useRef(null);
  useEffect(() => {
    const getContacts = async () => {
      const { data } = await axios.get('/contacts')
      setContacts(data)
    }

    getContacts()
  }, [])

  
    function handleSubmit(id,email, e) {
      e.preventDefault();
      
      //contacts = callRemoveApi(id)
      divRef.current.innerHTML = "Removed: " + email;
      
      
    }
  
  return (
    <div>
      {
        contacts.length
          ? <div className="table-responsive">
            <div ref={divRef}></div>
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
                      <td><a  >{contact.email}</a></td>
                      <td>{contact.subject}</td>
                      <td>{contact.message}</td>
                      <td><button onClick={(e) => handleSubmit(contact.id, contact.email, e)} >Hide</button></td>
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
