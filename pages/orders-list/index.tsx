import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { server } from '../../config/server'
import useGetUserId from '../../hooks/useGetUserId'
import { Iuser } from '../../interfaces/userInterface'
import MainLayout from '../../src/layouts/MainLayout'

function OrdersList() {
  const userId = useGetUserId()
  const [user,setUser] = useState<Iuser>()
  useEffect(()=>{
      if(userId._id){
        axios.get(`${server}/api/users/${userId._id}`).then(res=>{
          setUser(res.data)
        }).catch(e=>console.log(e))
      }
  },[])
  return (
    <MainLayout title='Orders'>
        <div className='px-4 flex flex-col gap-4 pb-[90px]'>
            {user?.orders?.map((o)=>(
              <Link key={o._id} href={`/orders-list/${o._id}`}>
                <div className="p-2 rounded bg-white flex items-center justify-between">
                  <h1>${o.total}</h1>
                  <h1>{o.createdAt}</h1>
                </div>
              </Link>
            ))}
        </div>
    </MainLayout>
  )
}

export default OrdersList