import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'
import { server } from '../../config/server'
import Button from '../../src/components/Button'
import Input from '../../src/components/Input'
import MainLayout from '../../src/layouts/MainLayout'

import useAuthUserToken from '../../hooks/useAuthUserToken'
import axios, { AxiosError } from 'axios'

function LogIn() {
    const router = useRouter()
    const [token, setToken] = useAuthUserToken()
    if(token) router.push('/')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const loginHandler = async() => {
        const user = { email, password }
        try {
            const res = await axios.post(`${server}/api/users/auth`,user)
            setEmail('')
            setPassword('')
            setToken(res.data.token)
            router.push('/')
        } catch (error) {
            const err:any = error as AxiosError
            console.log(error)
            setError(err.response?.data.error)
        }
    }
  return (
   <MainLayout>
       <div className='h-full flex flex-col justify-center items-center gap-4 px-4'>
            <Input value={email} onChange={(e:FormEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)} name='email' placeholder='enter your email' className='w-full'/>
            <Input value={password} onChange={(e:FormEvent<HTMLInputElement>)=>setPassword(e.currentTarget.value)} name='password' type='password' className='w-full' placeholder='enter your password'/>
            <Button onClick={loginHandler} title='Log In' className='bg-green-700 w-full my-2' />
            <p>{error}</p>
        </div>
   </MainLayout>
  )
}

export default LogIn