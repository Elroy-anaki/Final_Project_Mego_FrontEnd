import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import Order from './Order'

function OrdersHistory() {
  const { user } = useContext(AuthContext)

  const { data } = useQuery({
    queryKey: ['getOrdersByUser'],
    queryFn: async () => {
      const response = await axios.get(`/users/get-all-orders-by-user-id/${user._id}`)
      console.log(response.data.data)
      return response.data.data
    },
    select: (data) => data
  })

  return (
    <div>
      <div className="text-5xl text-center font-bold py-5 bg-gray-900">Your Orders</div>

      {data && data.map((order, index) => (
        <Order key={index} order={order} />
      ))}
    </div>
  )
}

export default OrdersHistory
