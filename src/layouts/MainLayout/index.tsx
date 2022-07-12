import React from 'react'
import useGetUserData from '../../../hooks/useGetUserData'
import Footer from '../../components/Footer'

interface Props {
    title:string,
    children?:React.ReactNode
}

function MainLayout({ title,children }:Props) {
  useGetUserData()
  return (
    <>
        <div className='h-full'>
            <main className='pb-[90px] h-full'>
                <h1 className='text-center font-bold py-4 text-2xl'>{title}</h1>
                {children}
            </main>
            <Footer/>
        </div>
    </>
  )
}

export default MainLayout