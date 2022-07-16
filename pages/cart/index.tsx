import Link from 'next/link'
import React, { useState } from 'react'
import useGetUserId from '../../hooks/useGetUserId'
import { Iuser } from '../../interfaces/userInterface'
import CartCard from '../../src/components/CartCard'
import Button from '../../src/components/Button'
import MainLayout from '../../src/layouts/MainLayout'
import { useSelector } from "react-redux"
import { IcartItem } from '../../interfaces/cartInterface'

interface Props{
  user:Iuser
}

function Cart() {


  const {items} = useSelector((store:any)=>store.cart)
  return (
    <>
        <MainLayout title='cart'>
        <div className='px-4 flex flex-col gap-4 pb-[90px]'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {items?.map((p:IcartItem)=>(
              <CartCard images={p.product.images} price={p.product.price} key={p._id} title={p.product.name} color={p.color} size={p.size} _id={p.product._id} quantity={p.quantity}/>
            ))}
          </div>
              <Link href={'/payment'}>
                <Button title='order' className='bg-red-500'/>
              </Link>
          </div>
        </MainLayout>
    </>
  )
}

export default Cart