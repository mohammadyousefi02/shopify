import { useRouter } from 'next/router'
import React from 'react'
import Input from '../../src/components/Input'
import MainLayout from '../../src/layouts/MainLayout'
import { Iuser } from '../../interfaces/userInterface'
import {useSelector} from "react-redux"
import { Store } from 'redux'

function Me() {
  const {user} = useSelector((store:any)=>store.user)
  return (
    <MainLayout title='Info'>
        <div className='flex flex-col gap-4 px-4'>
            <Input name='username' disabled value={user?.username} className={'bg-white text-gray-500 font-bold'} />
            <Input name='email' disabled value={user?.email} className={'bg-white text-gray-500 font-bold'} />
        </div>
    </MainLayout>
  )
}



export default Me