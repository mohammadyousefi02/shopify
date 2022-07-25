import React from 'react'
import Header from '../../components/adminPanel/Header'

interface Props {
    children?:React.ReactNode
}

function AdminPanelLayout({children}:Props) {
  return (
    <div>
        <Header/>
        {children}
    </div>
  )
}

export default AdminPanelLayout