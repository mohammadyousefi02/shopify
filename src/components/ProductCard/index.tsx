import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { server } from '../../../config/server'
import useAuthUserToken from '../../../hooks/useAuthUserToken'
import Button from '../Button'

import {useDispatch, useSelector} from "react-redux"
import {addSavedItem,removeSavedItem,setSavedItems} from "../../../redux/slices/savedItemsReducer"

interface Iprops {
    url:string,
    title:string,
    price:string,
    _id:string,
    secondBtnTitle?:string
}

function ProductCart({url,title,price,_id,secondBtnTitle="Save"}:Iprops) {
    const [isSaved,setIsSave] = useState(false)
    const {items} = useSelector((store:any)=>store.savedItems)
    useEffect(()=>{
        if(items.find((p:any)=>p?.product?._id===_id))setIsSave(true)
        else setIsSave(false)
    },[items])
    const dispatch = useDispatch()
    const [token] = useAuthUserToken()
    const router = useRouter()

    const addToCart = async() => {
        if(token){
            await axios.post(`${server}/api/add-to-cart/${_id}`,null,{
                headers:{
                    'x-auth-token':token
                }
            })
        }
    }
    const addToSave = async() => {
        if(token){
            setIsSave(true)
            const copySavedItems = [...items]
            dispatch(addSavedItem({item:{product:{image:url,name:title,price,_id}}}))
            try {
                await axios.post(`${server}/api/save-item/${_id}`,null,{
                    headers:{
                        'x-auth-token':token
                    }
                })
            } catch (error) {
                setIsSave(false)
                dispatch(setSavedItems({items:copySavedItems}))
            }
        }
    }
    const removeSavedItemHandler = async()=>{
        setIsSave(false)
        const copySavedItems = [...items]
        dispatch(removeSavedItem({id:_id}))
        try {
            await axios.post(`${server}/api/remove-saved-item/${_id}`,null,{
                headers:{
                    'x-auth-token':token
                }
            })
        } catch (error) {
            setIsSave(false)   
            dispatch(setSavedItems({items:copySavedItems}))
        }
    }
  return (
    <div className='bg-white pt-2 flex flex-col gap-2 justify-between shadow-md'>
        <div className='relative h-56'>
            <Image src={url} layout="fill" objectFit='contain' alt="aks"/>
        </div>
        <div className='px-2 text-center flex flex-col gap-1'>
            <h1 className='font-semibold'>{title}</h1>       
            <span className={`text-indigo-500 font-black`}>${price}</span> 
        </div>
        <div className='flex items-center'>
            
            <Link href={{pathname:`/products/[name]`,query:{id:_id}}} as={`/products/${title.split(" ").join("-")}`} className="bg-indigo-500 text-white py-1 flex-1"><Button title="Details" className='bg-indigo-500 text-white py-1 flex-1 rounded-none'/></Link>
            <Button title={isSaved ? "Remove" : "Save"} onClick={ isSaved ? removeSavedItemHandler : addToSave } className='bg-pink-500 py-1 flex-1 rounded-none'/>
        </div>
    </div>
  )
}


export default ProductCart