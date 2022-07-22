import React from 'react'
import useGetUserData from '../../../hooks/useGetUserData'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

interface Props {
    children?:React.ReactNode
}

function MainLayout({ children }:Props) {
  useGetUserData()
  return (
    <>
        <div>
          <ToastContainer/>
          <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    </>
  )
}

export default MainLayout