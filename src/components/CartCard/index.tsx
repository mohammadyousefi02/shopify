import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../../config/server'
import useAuthUserToken from '../../../hooks/useAuthUserToken'
import { addToCart, setCart, decreaseItemQuantity } from '../../../redux/slices/cartReducer'
import Button from '../Button'

interface Iprops {
    images:string[],
    title:string,
    price:string,
    _id:string,
    quantity:number,
    size:string,
    color:string
}


function CartCard({images,title,price,_id,quantity,size,color}:Iprops) {
    const [token] = useAuthUserToken()

    const dispatch = useDispatch()
    const {items} = useSelector((store:any)=>store.cart)
    const increaseQuantity = async() => {
        const copyCartItems = [...items]
        dispatch(addToCart({item:{color,size,product:{images,name:title,price,_id}}}))
        try {
            await axios.post(`${server}/api/add-to-cart/${_id}`,{size,color},{
                headers:{
                    'x-auth-token':token
                }
            })
        } catch (error) {
            dispatch(setCart({items:copyCartItems}))
        }
    }
        

    const decreaseQuantity = async() => {
        const copyCartItems = [...items]
        dispatch(decreaseItemQuantity({_id,color,size}))
        try {
            await axios.post(`${server}/api/decrease-item-quantity/${_id}`,{size, color},{
                headers:{
                    'x-auth-token':token
                }
            })
        } catch (error) {
            dispatch(setCart({items:copyCartItems}))
        }
        
    }
  return (
    <div className='bg-white pt-2 flex flex-col gap-2 justify-between shadow-md'>
        <div className='relative h-56'>
            <Image src={images[0]} layout="fill" objectFit='contain' alt="aks"/>
        </div>
        <div className='px-2 text-center flex flex-col gap-1'>
            <h1 className='font-semibold'>{title}</h1>       
            <span className={`text-indigo-500 font-black`}>total: ${+(price) * quantity}</span> 
            <span className={`text-indigo-500 font-black`}>size: {size}</span> 
            <span className={`text-indigo-500 font-black`}>color: {color}</span> 
        </div>
        <h1 className='text-center'>{quantity}</h1>
        <div className='flex items-center'>
            <Button title="+" onClick={increaseQuantity} className='bg-indigo-500 text-white py-1 flex-1 rounded-none'/>
            <Button title="-" onClick={decreaseQuantity} className='bg-pink-500 py-1 flex-1 rounded-none'/>
        </div>
    </div>
  )
}

// red green blue purple pink indigo yellow

export default CartCard