import React, { useEffect, useState } from 'react'
import useAuthUserToken from '../../hooks/useAuthUserToken'
import LogInSignIn from '../../src/components/LogInSignIn'
import UserProfile from '../../src/components/UserProfile'
import axios from 'axios'
import { server } from '../../config/server'
import { Iuser } from '../../interfaces/userInterface'
import useGetUserId from '../../hooks/useGetUserId'


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
  const [token, setToken] = useAuthUserToken()

  return (
    <>
       {!token ? <LogInSignIn/> : <UserProfile user={user!}/> }
    </>
  )
}

export default Profile