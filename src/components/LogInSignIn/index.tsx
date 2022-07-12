import Link from 'next/link'
import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import Button from '../Button'

function LogInSignIn() {
  return (
    <MainLayout title='profile'>
        <div className='flex flex-col justify-center items-center h-full gap-4 px-4'>
        <Link href="/register"><Button title='Sign In' className='bg-red-500 w-full'/></Link>
        <Link href="/login"><Button title='Log In' className='bg-indigo-500 w-full'/></Link>
    </div>
  </MainLayout>
  )
}

export default LogInSignIn