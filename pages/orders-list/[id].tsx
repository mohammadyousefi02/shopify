import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'
import { server } from '../../config/server'
import { Iorder } from '../../interfaces/orderInterface'
import OrderCard from '../../src/components/OrderCard'
import MainLayout from '../../src/layouts/MainLayout'

interface Props {
  order:Iorder
}

function SingleOrder({order}:Props) {
  return (
    <MainLayout title={order.createdAt.toString()}>
        <div className='px-4 flex flex-col gap-4 pb-[90px]'>
          <h1>total: ${order.total}</h1>
          {order.items.map((i)=>(
            <OrderCard key={i._id} color={i.color} quantity={i.quantity} size={i.size} title={i.product.name} url={i.product.image} price={i.product.price}/>
          ))}
        </div>
    </MainLayout>
  )
}

export const getServerSideProps:GetServerSideProps = async (context) =>{ 
    const {id} = context.query
    const res = await axios.get(`${server}/api/orders/${id}`)
    return {
      props:{
        order:res.data.order
      }
    }
}

export default SingleOrder