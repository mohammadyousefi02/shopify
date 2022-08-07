import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import { server } from '../../../config/server'
import useAuthUserToken from '../../../hooks/useAuthUserToken'
import { Iorders } from '../../../interfaces/orderInterface'
import OrderSection from '../../../src/components/adminPanel/OrderSection'
import AdminPanelLayout from '../../../src/layouts/AdminPanelLayout'

function Orders() {
  const [token] = useAuthUserToken()
  const [orders, setOrders] = useState<Iorders[]>()
  
  const getOrders = () => axios.get(`${server}/api/orders`).then(e=>setOrders(e.data)).catch(e=>console.log(e))
  useLayoutEffect(() => {
    getOrders()
  },[])
  
  return (
    <div>
        <AdminPanelLayout>
            {orders &&  <OrderSection data={orders} /> }
        </AdminPanelLayout>
    </div>
  )
}

export default Orders