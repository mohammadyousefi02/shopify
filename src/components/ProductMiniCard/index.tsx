import React, { HTMLAttributes } from 'react'
import Image from "next/image"

interface Props {
    image:string,
    title:string,
    price:string,
    className?:string,
    code:number
}

function ProductMiniCard({image, title, price, className="",code}:Props) {
  return (
    <div className={`flex items-center justify-between p-4 ${className}`}>
        <div className='flex items-center gap-2'>
            <Image src={image} width={75} height={75} alt={title} className="rounded-xl"/>
            <h1 className='text-[18px]'>{title} - {code}</h1>
        </div>
        <h1 className='text-primary'>{Number(price).toLocaleString('fa')} تومان</h1>
    </div>
  )
}

export default ProductMiniCard