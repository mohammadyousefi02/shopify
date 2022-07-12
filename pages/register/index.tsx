import React, { FormEvent, useState } from 'react'
import MyButton from '../../src/components/MyButton'
import MyInput from '../../src/components/MyInput'
import MainLayout from '../../src/layout/MainLayout'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { server } from '../../config/server'
import { useRouter } from "next/router"
import useAuthUserToken from '../../hooks/useAuthUserToken'
import {useDispatch} from "react-redux"
import {setUser} from "../../redux/reducers/userReducer"

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
                // const resObj = await res.json()
                setToken(res.data.token)
                router.push('/')
            }
        }catch(e){
                const error = e as AxiosError
                // const resObj = await res.json()
                // setError(error.response?.data.error)
                const data:any = error.response?.data
                setError(data.error)
        }
        // const res = await fetch(`${server}/api/users/register`, {
        //     method:'POST',
        //     headers:{
        //         'Content-Type' : 'application/json'
        //     },
        //     body:JSON.stringify(newUser)
        // })
        
    }
  return (
   <MainLayout title='Sign In'>
       <div className='h-full flex flex-col justify-center items-center gap-4 px-4'>
            <MyInput value={username} onChange={(e:FormEvent<HTMLInputElement>)=>setUsername(e.currentTarget.value)} name='username' placeholder='enter your username' />
            <MyInput value={email} onChange={(e:FormEvent<HTMLInputElement>)=>setEmail(e.currentTarget.value)} name='email' placeholder='enter your email'/>
            <MyInput value={password} onChange={(e:FormEvent<HTMLInputElement>)=>setPassword(e.currentTarget.value)} name='password' type='password' placeholder='enter your password'/>
            <MyButton onClick={registerHandler} title='Sign In' className='bg-green-700 w-full my-2' />
            <p>{error}</p>
        </div>
   </MainLayout>
  )
}

export default SignIn