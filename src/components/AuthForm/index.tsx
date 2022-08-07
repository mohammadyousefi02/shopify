import React, { useState } from 'react'

import { BiUser, BiUserPlus } from "../../../icons"
import Button from '../Button'
import Input from '../Input'

import * as Yup from "yup"

import { useFormik } from "formik"
import { server } from '../../../config/server'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import useAuthUserToken from '../../../hooks/useAuthUserToken'

interface Props {
  signUpForm?:boolean,
  className?:string,
  endpoint?:'users' | 'admins'
}

function AuthForm({signUpForm=false, className="",endpoint="users"}:Props) {
  const [token, setToken] = useAuthUserToken()
  const router = useRouter()
  const [error, setError] = useState('')
  const logInFormik = useFormik({
    initialValues:{
      email: '',
      password: '',
    },
    validationSchema:Yup.object().shape({
      email:Yup.string().email('ایمیلی که وارد کرده اید معتبر نیست').required("وارد کردن ایمیل الزامیست"),
      password:Yup.string().min(8,'گذرواژه حداقل باید 8 کاراکتر باشد').required("وارد کردن گذرواژه الزامی است")
    }),
    onSubmit: async(values) => {
      try {
        const user = {email: values.email, password:values.password}
        const res = await axios.post(`${server}/api/${endpoint}/auth`,user)
        setToken(res.data.token)
        endpoint === "users" && router.push('/')
        logInFormik.resetForm()
    } catch (error) {
        const err:any = error as AxiosError
        setError(err.response?.data.error)
    }
    }
  })
  const signUpFormik = useFormik({
    initialValues:{
      username: '',
      email: '',
      password: ''
    },
    validationSchema:Yup.object().shape({
      username: Yup.string().required("وارد کردن نام کاربری الزامی است"),
      email:Yup.string().email('ایمیلی که وارد کرده اید معتبر نیست').required("وارد کردن ایمیل الزامی است"),
      password:Yup.string().min(8,'گذرواژه حداقل باید 8 کاراکتر باشد').required("وارد کردن گذرواژه الزامی است")
    }),
    onSubmit: async(values) => {
      const newUser = {username:values.username, email:values.email, password:values.password}
      try{
          const res = await axios.post(`${server}/api/users/register`,newUser)
          if(res.status === 201){
              logInFormik.resetForm()
              setToken(res.data.token)
              router.push('/')
          }
      }catch(e){
          const error = e as AxiosError
          const data:any = error.response?.data
          setError(data.error)
      }
    }
  })
  return (
    <div className={`w-full flex flex-col ${className}`}>
        <div className='flex gap-2 items-center self-center text-lg'>
            {signUpForm ?
            <>
              <BiUserPlus/>
              <span>ثبت نام</span>
            </>
            :
            <>
              <BiUser/>
              <span>ورود</span>
            </> 
            }
        </div>
        <div className='border flex flex-col gap-4 px-4 py-9 mt-2 rounded-lg'>
        <form onSubmit={signUpForm ? signUpFormik.handleSubmit : logInFormik.handleSubmit} className='flex flex-col gap-4'>
            {signUpForm && (
              <div className='flex flex-col gap-2'>
                <Input label="نام کاربری" rounded='normal' id='username' name='username' onInput={()=>setError('')} onChange={signUpFormik.handleChange} value={signUpFormik.values.username}/>
                <span className='text-primary'>{signUpFormik.errors.username}</span>
              </div>
            )}
            <div className='flex flex-col gap-2'>
              <Input label="ایمیل" rounded='normal' id='email' name='email' onInput={()=>setError('')} onChange={signUpForm ? signUpFormik.handleChange : logInFormik.handleChange} value={signUpForm ? signUpFormik.values.email : logInFormik.values.email}/>
              <span className='text-primary'>{signUpForm ? signUpFormik.errors.email : logInFormik.errors.email}</span>
            </div>
            <div className='flex flex-col gap-2'>
              <Input label="گذرواژه" type='password' rounded='normal' id='password' name='password' onInput={()=>setError('')} onChange={signUpForm ? signUpFormik.handleChange : logInFormik.handleChange} value={signUpForm ? signUpFormik.values.password : logInFormik.values.password}/>
              <span className='text-primary'>{signUpForm ? signUpFormik.errors.password : logInFormik.errors.password}</span>
              {error && <span className='text-primary'>{error}</span>}
            </div>
            <Button title={signUpForm ? 'ثبت نام' : 'ورود'} color='pink' className='w-full' rounded='normal'/>
        </form>
        </div>
    </div>
  )
}

export default AuthForm