import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useAuthUserToken from '../../hooks/useAuthUserToken'
import jwtDecode from 'jwt-decode'
import { IdecodedToken } from '../../interfaces/decodedTokenInterface'
import AuthForm from '../../src/components/AuthForm'
import AdminPanelLayout from '../../src/layouts/AdminPanelLayout'

function Admin() {
    const router = useRouter()
    const [ token ] = useAuthUserToken()
    useEffect(()=>{
        if(token){
            const decoded:IdecodedToken = jwtDecode(token)
            if(decoded.isAdmin) router.push('/admin/categories');
            else router.push('/')
        }
    },[])
  return (
    <div className='flex justify-center items-center bg-white h-full'>
        <AuthForm endpoint='admins'/>
    </div>
  )
}

export default Admin