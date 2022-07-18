import React, { FormEvent, useState } from 'react'
import Button from '../../src/components/Button'
import Input from '../../src/components/Input'
import MainLayout from '../../src/layouts/MainLayout'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { server } from '../../config/server'
import { useRouter } from "next/router"
import useAuthUserToken from '../../hooks/useAuthUserToken'

function SignIn() {
    const [token,setToken] = useAuthUserToken()
    const router = useRouter()
    if(token) router.push('/')
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const registerHandler = async() => {
        const newUser = {username, email, password}
        try{
            const res = await axios.post(`${server}/api/users/register`,newUser)
            if(res.status === 201){
                setUsername('')
                setEmail('')
                setPassword('')
                setToken(res.data.token)
                router.push('/')
            }
        }catch(e){
                const error = e as AxiosError
                const data:any = error.response?.data
                setError(data.error)
        }
    }
  return (
   <MainLayout>
       <div className='h-full flex flex-col justify-center items-center gap-4 px-4'>
            <Input value={username} onChange={(e:FormEvent<HTMLInputElement>)=>setUsername(e.currentTarget.value)} name='username' placeholder='enter your username' />
            <Input value={email} onChange={(e:FormEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)} name='email' placeholder='enter your email'/>
            <Input value={password} onChange={(e:FormEvent<HTMLInputElement>)=>setPassword(e.currentTarget.value)} name='password' type='password' placeholder='enter your password'/>
            <Button onClick={registerHandler} title='Sign In' className='bg-green-700 w-full my-2' />
            <p>{error}</p>
        </div>
   </MainLayout>
  )
}

export default SignIn