import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from '../../axios'

export default function Users() {

  const [users, setUsers] = useState([])
  const [userToUpdate, setUserToUpdate] = useState({})
  const [show, setShow] = useState(false)


  const handleClose = () => {
    setUserToUpdate({})
    setShow(false)
  }

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get('/users')
      setUsers(data)
    }

    getUsers()
  }, [])

  const updateModal = async (user) => {
    setUserToUpdate(user)
    setShow('update')
  }

  const save = async () => {

    if (!userToUpdate.fullname) return
    if (!userToUpdate.email) return
    if (!userToUpdate.password) return

    if (show === 'update') {
      const { data } = await axios.put('/users', { userToUpdate })
      setUsers(data)
    }

    else {
      const { data } = await axios.post('/addUser', { userToUpdate })
      setUsers(data)
    }

    handleClose()
  }

  const addUser = () => {
    setShow('add')
  }

  const deleteUser = async (id) => {
    const { data } = await axios.delete(`/user/${id}`)
    setUsers(data)
  }


  if (!users.length) return <p className='text-muted py-4'>No users in the database</p>


  return (
    <div>
      <div className='d-flex justify-content-end'>
        <button onClick={addUser} className='btn btn-primary mb-2'>Add User</button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fullname</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr key={user.id} >
                  <th scope="row">{user.id}</th>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td className='text-truncate'>{user.password.substring(0, 20)}...</td>
                  <td> {Number(user.admin) === 1 ? 'True' : 'False'} </td>
                  <td className='d-flex'>
                    <button onClick={() => deleteUser(user.id)} className='btn btn-sm btn-danger me-1'>
                      <FaTrash size={15} />
                    </button>
                    <button onClick={() => updateModal(user)} className='btn btn-sm btn-success'>
                      <AiFillEdit size={15} />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
      {
        userToUpdate && <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{show === 'update' ? 'Update' : 'Add'} User {userToUpdate.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Fullname :</label>
            <input
              className='form-control mb-2'
              value={userToUpdate.fullname}
              onChange={({ target }) => setUserToUpdate(prev => {
                return { ...prev, fullname: target.value }
              })}
            />
            <label>Email :</label>
            <input
              value={userToUpdate.email}
              className='form-control mb-2'
              onChange={({ target }) => setUserToUpdate(prev => {
                return { ...prev, email: target.value }
              })}
            />
            <label>Password :</label>
            <input
              value={userToUpdate.password}
              className='form-control mb-2'
              onChange={({ target }) => setUserToUpdate(prev => {
                return { ...prev, password: target.value }
              })}
            />
            <Form.Check
              type="switch"
              label="is Admin"
              checked={Number(userToUpdate.admin) === 1 ? true : false}
              onChange={({ target }) => setUserToUpdate(prev => {
                return { ...prev, admin: target.checked }
              })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={save} variant="primary">Save</Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  )
}
