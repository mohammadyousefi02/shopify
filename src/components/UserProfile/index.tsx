import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import useAuthUserToken from "../../../hooks/useAuthUserToken"
import Button from '../Button'
import ListItem from '../ListItem'
import {FaShippingFast, BiUserCircle} from "../../../icons"
import { Iuser } from "../../../interfaces/userInterface"

interface Props  {
    user:Iuser
}

function UserProfile({user} : Props) {
    const [token,setToken, removeToken] = useAuthUserToken()

  return (
    <MainLayout>
        <div className='px-4 flex flex-col gap-4'>
            <h1 className='text-center font-bold'>dear {user?.username}</h1>
            <ListItem color='blue' title='profile info' Icon={BiUserCircle} href="/me" />
            <ListItem color='green' title='orders' Icon={FaShippingFast} href="/orders-list"/>
            <Button onClick={removeToken} title='log out' className='bg-red-500 w-full'/>
        </div>
    </MainLayout>
  )
}

export default UserProfile