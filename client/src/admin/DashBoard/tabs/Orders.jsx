import React, { useState, useEffect } from 'react'
import axios from '../../axios'
import moment from 'moment'

export default function Orders() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await axios.get('/orders')
      setOrders(data)
    }

    getOrders()
  }, [])


  return (
    <div>
      {
        orders.length
          ? <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Token</th>
                  <th scope="col">Total</th>
                  <th scope="col">Date</th>
                  <th scope="col">User ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.token}</td>
                      <td>${order.total}</td>
                      <td>{moment(Number(order.date)).format('L')}</td>
                      <td>{order.userId}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </div>
          : <p className='text-muted py-4'>No orders in the database</p>
      }


    </div>
  )
}
