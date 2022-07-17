import Image from 'next/image'
import React from 'react'


interface Iprops {
    image:string,
    title:string,
    price:string,
    quantity:number,
    size:string,
    color:string,
}


function OrderCard({image,title,price,quantity,size,color}:Iprops) {

  return (
    <div className='bg-white py-2 flex flex-col gap-2 justify-between shadow-md'>
        <div className='relative h-56'>
            <Image src={image} layout="fill" objectFit='contain' alt="aks"/>
        </div>
        <div className='px-2 text-center flex flex-col gap-1'>
            <h1 className='font-semibold'>{title}</h1>       
            <span className={`text-indigo-500 font-black`}>total: ${+(price) * quantity}</span> 
            <span className={`text-indigo-500 font-black`}>size: {size}</span> 
            <span className={`text-indigo-500 font-black`}>color: {color}</span> 
        </div>
        <h1 className='text-center'>quantity: {quantity}</h1>
    </div>
  )
}


export default OrderCard