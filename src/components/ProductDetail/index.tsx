import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { server } from '../../../config/server'
import useAuthUserToken from '../../../hooks/useAuthUserToken'
import Button from '../Button'
import Select from "react-select"
import { useRouter } from 'next/router'
import { values } from 'lodash'
import {useSelector, useDispatch} from "react-redux"
import {setCart, addToCart} from "../../../redux/slices/cartReducer"
import {v4 as uuidv4} from "uuid"
import { Isize } from "../../../interfaces/productInterface"
import { isPending } from '@reduxjs/toolkit'
import { FiChevronLeft } from "../../../icons"

interface Iprops {
    images:string[],
    title:string,
    price:string,
    _id:string,
    sizes:Isize[],
    code:number,
    category:string
}

function ProductDetail({images,title,price,sizes,_id,code,category}:Iprops) {
    const dispatch = useDispatch()

    interface Ioption {
        label:string,
        value:string
    }

    const {items} = useSelector((store:any)=>store.cart)
    const [sizeOptions, setSizeOptions] = useState<Ioption[]>([])
    const [colorOptions, setColorOptions] = useState<Ioption[]>([])
    const [image, setImage] = useState('')
    const [quantity, setQuantity] = useState(0)
    const router = useRouter()
    const [error,setError] = useState("")

    const [size,setSize] = useState("")
    const [color,setColor] = useState("")

    const [token] = useAuthUserToken()
   useEffect(()=>{
    setImage(images[0])
    const copySizeOptions:Ioption[] = []
    sizes.forEach(s=>{
        copySizeOptions.push({value:s.size,label:s.size})
    })
    setSizeOptions(copySizeOptions)
   },[])

   useEffect(()=>{
    const chosenSize = sizes.find(s=>s.size === size)
    setQuantity(chosenSize?.quantity || 0)
    const colorOptions:Ioption[] = []
    chosenSize?.colors.forEach(c=>{
        colorOptions.push({value:c,label:c})
    })
    setColorOptions(colorOptions)
   },[size])

    const addToCartHandler = async() => {
        if(token){
            if(size && color){
                const copyCartItems = [...items]
                dispatch(addToCart({item:{_id:uuidv4(),color,size,product:{images,name:title,price,_id}}}))
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
    <div className='bg-white p-2 flex flex-col'>
        <div className='flex'>
            <div  className='w-[600px] h-[500px] relative'>
                <Image src={image || images[0]} layout='fill' objectFit='cover' alt='title'/>
            </div>
            <div className='flex flex-col gap-2 flex-1 pr-4 pl-3'>
                <div className='flex items-center gap-2 text-[32px] pb-1 w-full border-b'>
                    <FiChevronLeft color='#1E73BE'/>
                    <h1>{title}</h1>
                </div>
                <div className='flex w-full'>
                    <div className='flex-1 flex gap-2'>
                        <span>کد محصول:</span>
                        <span className='text-[#1E73BE]'>{code}</span>
                    </div>
                    <div className='flex-1 flex gap-2'>
                        <span>دسته بندی:</span>
                        <span className='text-[#1E73BE]'>{category}</span>
                    </div>
                </div>
                <h1 className='text-[#56B261] text-[36px]'>{price} تومان</h1>
                <div className=' flex flex-col gap-2 w-[200px]'>
                    <label htmlFor="">انتخاب سایز:</label>
                    <Select onChange={(value)=>setSize(value!.value)} options={sizeOptions}/>
                </div>
                <div className=' flex flex-col gap-2 w-[200px]'>
                    <label htmlFor="">انتخاب رنگ:</label>
                    <Select onChange={(value)=>setColor(value!.value)} options={colorOptions}/>
                </div>
                {size ? <p>{quantity} در انبار</p> : <p>یک سایز را انتخاب کنید</p>}
                <div className='pt-4 flex items-center justify-between gap-4'>
                    <div>
                        {images.map(i=>(
                            <Image key={i} onClick={()=>setImage(i)} src={i} width={75} height={75} alt={""} className="rounded-lg cursor-pointer"/>
                        ))}
                    </div>
                </div>
                <div className='flex-1 mt-4'>
                    <Button title='افزودن به سبد خرید' onClick={addToCartHandler} color='green' className='py-3 w-full' rounded='normal'/>
                    <p className='text-center py-1'>{error}</p>
                </div>
            </div>
        </div>
    </div>
    // <div className='bg-white pt-2 flex flex-col gap-2 justify-between shadow-md'>
    //     <div className='relative h-56'>
    //         <Image src={images[0]} layout="fill" objectFit='contain' alt="aks"/>
    //     </div>
    //     <div className='px-2 text-center flex flex-col gap-1'>
    //         <h1 className='font-semibold'>{title}</h1>       
    //         <span className={`text-indigo-500 font-black`}>Price: ${price}</span> 
    //     </div>
    //     <div className='px-4 mt-4'>
    //         <label htmlFor="">select a size</label>
    //         <Select onChange={(value)=>setSize(value!.value)} options={sizeOptions}/>
    //     </div>
    //     <div className='px-4 my-4'>
    //         <label htmlFor="">select a color</label>
    //         <Select onChange={(value)=>setColor(value!.value)} options={colorOptions}/>
    //     </div>
    //     <Button title="Add To Cart" onClick={addToCartHandler} className='bg-indigo-500 text-white py-1 flex-1 rounded-none'/>
    //     <p className='text-center py-1'>{error}</p>
    // </div>
  )
}

export default ProductDetail