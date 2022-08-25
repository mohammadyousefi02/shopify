import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useRef} from 'react'
import { server } from '../../../config/server'
import useAuthUserToken from '../../../hooks/useAuthUserToken'
import Button from '../Button'
import { FaRegHeart, FaHeart } from "../../../icons"
import { toast } from 'react-toastify';

import {useDispatch, useSelector} from "react-redux"
import {addSavedItem,removeSavedItem,setSavedItems} from "../../../redux/slices/savedItemsReducer"

interface Iprops {
    images:string[],
    title:string,
    price:string,
    _id:string,
    code?:number
}

function ProductCart({images,title,price,_id,code}:Iprops) {
    const [image, setImage] = useState('')
    const [isSaved,setIsSave] = useState(false)
    const [mouseOver,setMouseOver] = useState(false)
    const {items} = useSelector((store:any)=>store.savedItems)
    const divElem = useRef<HTMLDivElement>(null)
    const saveElem = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        setImage(images[0])
        divElem.current?.addEventListener('mouseover',()=>{
            if(images[1]){
                setImage(images[1])
            }
            setMouseOver(true)
        })
        divElem.current?.addEventListener('mouseout',()=>{
            setImage(images[0])
            saveElem.current?.addEventListener('mouseover',()=>setMouseOver(true))
            setMouseOver(false)
        })
        
    },[])
    useEffect(()=>{
        if(items.find((p:any)=>p?.product?._id===_id))setIsSave(true)
        else setIsSave(false)
    },[items])
    const dispatch = useDispatch()
    const [token] = useAuthUserToken()
    const router = useRouter()

    
    const addToSave = async() => {
        if(token){
            setIsSave(true)
            const copySavedItems = [...items]
            dispatch(addSavedItem({item:{product:{images,name:title,price,_id}}}))
            try {
                await axios.post(`${server}/api/save-item/${_id}`,null,{
                    headers:{
                        'x-auth-token':token
                    }
                })
            } catch (error) {
                setIsSave(false)
                dispatch(setSavedItems({items:copySavedItems}))
                toast.error("خطایی رخ داده است")
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
            toast.error("خطایی رخ داده است")
        }
    }
  return (
    <div className='relative'>
    {mouseOver && (  
        <div ref={saveElem} className='bg-white save-icon cursor-pointer absolute left-4 top-4 p-2 text-[16px] rounded-lg z-20' onClick={ isSaved ? removeSavedItemHandler : addToSave }>
            {isSaved ? <FaHeart className='text-primary'/> : <FaRegHeart/>}
        </div>
    )}
        {/* <Link href={{pathname:`/products/[name]`,query:{id:_id}}} as={`/products/${title.split(" ").join("-")}`}> */}
        <Link href={`/products/${code}/${title.split(" ").join("-")}`}>
        {/* <Link href={{pathname:`/products/[...slug]`}} as={`/products/${code?.toString()}/${title.split(" ").join("-")}`}> */}
            <a>
                <div ref={divElem} className=' md:h-[406px] h-[303px] shadow cursor-pointer flex flex-col justify-between items-center rounded-lg p-2 bg-white'>
                    <div className='w-full h-[70%] flex flex-col gap-2'>
                        <div className='h-[90%] bg-slate-400 rounded-lg relative'>
                            
                            <Image src={image || images[0]} layout="fill" objectFit='cover' alt={title} className="hover:scale-150 transition duration-75"/>
                        </div>
                        <p className='break-words text-center'>{title} - کد {code}</p>
                    </div>
                    <span className='text-primary '>{Number(price).toLocaleString('fa')} تومان</span>
                </div>
            </a>
        </Link>
    </div>
  )
}


export default ProductCart