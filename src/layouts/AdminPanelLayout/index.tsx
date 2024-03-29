import React from 'react'
import Header from '../../components/adminPanel/Header'
import convertNumToPer from '../../../utils/convertNumToPer'


interface Props {
    children?:React.ReactNode
}

function AdminPanelLayout({children}:Props) {
  convertNumToPer()
  return (
    <div className='flex h-full'>
        <Header/>
        {children}
    </div>
  )
}

export default AdminPanelLayout