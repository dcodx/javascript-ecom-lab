import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../../axios'
import { FaTrash } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'
import { Modal, Button } from 'react-bootstrap'

export default function Products() {

  const [products, setProducts] = useState([])
  const [show, setShow] = useState(false)
  const [productToUpdate, setProductToUpdate] = useState({})

  const handleClose = () => {
    setProductToUpdate({})
    setShow(false)
  }

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get('/products')
      setProducts(data)
    }

    getProducts()
  }, [])

  const deleteProduct = async (id) => {
    const { data } = await axios.delete(`/product/${id}`)
    setProducts(data)
  }


  const updateModal = async (product) => {
    setProductToUpdate(product)
    setShow('update')
  }

  const save = async () => {

    if (!productToUpdate.name) return
    if (!productToUpdate.price) return
    if (!productToUpdate.img) return
    if (!productToUpdate.desc) return
    if (!productToUpdate.stars) return


    if (show === 'update') {
      const { data } = await axios.put('/products', { productToUpdate })
      setProducts(data)
    }
    else {
      const { data } = await axios.post('/addProduct', { productToUpdate })
      setProducts(data)
    }

    handleClose()
  }

  if (!products.length) return <p className='text-muted py-4'>No products in the database</p>


  return (
    <div>
      <div className='d-flex justify-content-end'>
        <button onClick={() => setShow('add')} className='btn btn-primary mb-2'>Add Product</button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(product => (
                <tr key={product.id} >
                  <td>{product.id}</td>
                  <td>
                    <img src={product.img} alt={product.name} style={{ maxWidth: '50px' }} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.desc.substring(0, 40)}...</td>
                  <td>{product.stars}</td>
                  <td className='d-flex'>
                    <button onClick={() => deleteProduct(product.id)} className='btn btn-sm btn-danger me-1'>
                      <FaTrash size={15} />
                    </button>
                    <button onClick={() => updateModal(product)} className='btn btn-sm btn-success'>
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
        productToUpdate && <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{show === 'update' ? 'Update' : 'Add'} Product {productToUpdate.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Image :</label>
            <input
              className='form-control mb-2'
              value={productToUpdate.img}
              onChange={({ target }) => setProductToUpdate(prev => {
                return { ...prev, img: target.value }
              })}
            />
            <label>Name :</label>
            <input
              className='form-control mb-2'
              value={productToUpdate.name}
              onChange={({ target }) => setProductToUpdate(prev => {
                return { ...prev, name: target.value }
              })}
            />
            <label>Price :</label>
            <input
              className='form-control mb-2'
              value={productToUpdate.price}
              onChange={({ target }) => setProductToUpdate(prev => {
                return { ...prev, price: target.value }
              })}
            />
            <label>Description :</label>
            <textarea
              className='form-control mb-2'
              value={productToUpdate.desc}
              rows={5}
              onChange={({ target }) => setProductToUpdate(prev => {
                return { ...prev, desc: target.value }
              })}
            />
            <label>Rating :</label>
            <input
              className='form-control mb-2'
              value={productToUpdate.stars}
              onChange={({ target }) => setProductToUpdate(prev => {
                return { ...prev, stars: target.value }
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
