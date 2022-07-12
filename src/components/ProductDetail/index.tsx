import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { server } from '../../../config/server'
import useAuthUserToken from '../../../hooks/useAuthUserToken'
import Button from '../Button'
import Select from "react-select"
import { useRouter } from 'next/router'
import { values } from 'lodash'
import {useSelector, useDispatch} from "react-redux"
import {setCart, addToCart} from "../../../redux/slices/cartReducer"
import {v4 as uuidv4} from "uuid"

interface Iprops {
    url:string,
    title:string,
    price:string,
    _id:string,
    sizes:string[],
    colors:string[]
}

function ProductDetail({url,title,price,sizes,colors,_id}:Iprops) {
    const dispatch = useDispatch()

    const {items} = useSelector((store:any)=>store.cart)
    const router = useRouter()
    const [error,setError] = useState("")

    const [size,setSize] = useState("")
    const [color,setColor] = useState("")

    const [token] = useAuthUserToken()
    const sizeOptions = sizes.filter(s=>s!=="ALL").map(s=>{
        return {value:s,label:s}
    })

    const colorOptions = colors.map(c=>{
        return {value:c,label:c}
    })

    const addToCartHandler = async() => {
        if(token){
            if(size && color){
                const copyCartItems = [...items]
                dispatch(addToCart({item:{_id:uuidv4(),color,size,product:{image:url,name:title,price,_id}}}))
                try {
                    await axios.post(`${server}/api/add-to-cart/${_id}`,{size,color},{
                        headers:{
                            'x-auth-token':token
                        }
                    })
                } catch (error) {
                    dispatch(setCart({items:copyCartItems}))
                }
            }else setError("choose size and color")
        }else{
            router.push('/profile')
        }
    }

  return (
    <div className='bg-white pt-2 flex flex-col gap-2 justify-between shadow-md'>
        <div className='relative h-56'>
            <Image src={url} layout="fill" objectFit='contain' alt="aks"/>
        </div>
        <div className='px-2 text-center flex flex-col gap-1'>
            <h1 className='font-semibold'>{title}</h1>       
            <span className={`text-indigo-500 font-black`}>Price: ${price}</span> 
        </div>
        <div className='px-4 mt-4'>
            <label htmlFor="">select a size</label>
            <Select onChange={(value)=>setSize(value!.value)} options={sizeOptions}/>
        </div>
        <div className='px-4 my-4'>
            <label htmlFor="">select a color</label>
            <Select onChange={(value)=>setColor(value!.value)} options={colorOptions}/>
        </div>
        <Button title="Add To Cart" onClick={addToCartHandler} className='bg-indigo-500 text-white py-1 flex-1 rounded-none'/>
        <p className='text-center py-1'>{error}</p>
    </div>
  )
}

export default ProductDetail