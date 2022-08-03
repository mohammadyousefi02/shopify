import Link from 'next/link'
import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import Button from '../Button'

import { BiUser, BiUserPlus } from "../../../icons"
import Input from '../Input'
import AuthForm from '../AuthForm'
import useAuthUserToken from '../../../hooks/useAuthUserToken'
import { useRouter } from 'next/router'

function LogInSignIn() {
  const [token] = useAuthUserToken()
  const router = useRouter()
  if(token)router.push('/')
  return (
    <MainLayout>
        <div className='container mx-auto py-8 px-4'>
            <div className='bg-white py-4 rounded'>
              <div className='flex flex-col md:flex-row justify-center gap-8 px-4'>
                <AuthForm/>
                <AuthForm signUpForm={true}/>
              </div>
            </div>
        </div>
    </MainLayout>
  )
}

export default LogInSignIn