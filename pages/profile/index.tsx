import React, { useEffect, useState } from 'react'
import useAuthUserToken from '../../hooks/useAuthUserToken'
import LogInSignUp from '../../src/components/LogInSignUp'
import UserProfile from '../../src/components/UserProfile'
import axios from 'axios'
import { server } from '../../config/server'
import { Iuser } from '../../interfaces/userInterface'
import useGetUserId from '../../hooks/useGetUserId'
import Head from 'next/head'


function Profile() {
  const userId = useGetUserId()
  const [user,setUser] = useState<Iuser>()
  useEffect(()=>{
      if(userId._id){
        axios.get(`${server}/api/users/${userId._id}`).then(res=>{
          setUser(res.data)
        }).catch(e=>console.log(e))
      }
  },[])
  const [ token ] = useAuthUserToken()

  return (
    <>
      <Head>
        <title>{!token ? "ورود یا ثبت نام" : "پروفایل"}</title>
      </Head>
       {!token ? <LogInSignUp/> : <UserProfile user={user!}/> }
    </>
  )
}

export default Profile