import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { server } from '../../config/server'
import useAuthUserToken from '../../hooks/useAuthUserToken'
import Button from '../../src/components/Button'
import Input from '../../src/components/Input'
import MainLayout from '../../src/layouts/MainLayout'

function Payment() {
    const [token] = useAuthUserToken()
    const [name,setName] = useState('')
    const [province,setProvince] = useState('')
    const [city,setCity] = useState('')
    const [address,setAddress] = useState('')
    const router = useRouter()
    const order = async() => {
        const userInfo = {name, province, city, address}
        try {
            await axios.post(`${server}/api/orders`,userInfo,{
                headers:{
                    'x-auth-token':token
                }
            })
            router.push('/')
        } catch (error) {
            console.log(error)   
        }
    }

  return (
    <MainLayout title='payment'>
        <div className='px-4 flex flex-col gap-4'>
            <Input value={name} onChange={(e)=>setName(e.target.value)} name='name'/>
            <Input value={province} onChange={(e)=>setProvince(e.target.value)} name='province'/>
            <Input value={city} onChange={(e)=>setCity(e.target.value)} name='city'/>
            <Input value={address} onChange={(e)=>setAddress(e.target.value)} name='address'/>
            <Button title='pay' onClick={order} className="bg-blue-500"/>
        </div>
    </MainLayout>
  )
}

export default Payment