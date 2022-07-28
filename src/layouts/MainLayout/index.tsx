import React, { useState } from 'react'
import useGetUserData from '../../../hooks/useGetUserData'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import BottomMenu from '../../components/BottomMenu';
import SideBarMenu from '../../components/SideBarMenu';
import convertNumToPer from '../../../utils/convertNumToPer'


interface Props {
    children?:React.ReactNode
}

function MainLayout({ children }:Props) {
  convertNumToPer()
  const [ showSideBar, setShowSideBar ] = useState(false)
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
            <BottomMenu setShowSideBar={setShowSideBar}/>
            {showSideBar && <SideBarMenu setShowSideBar={setShowSideBar} />}
        </div>
    </>
  )
}

export default MainLayout