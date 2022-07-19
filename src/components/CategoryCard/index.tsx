import React from 'react'
import { Iproduct } from '../../../interfaces/productInterface'
import ProductCart from '../ProductCard'

interface Props {
    title:string,
    products: Iproduct[]
}

function CategoryCard({title, products}:Props) {
  return (
    <div className='w-full flex flex-col gap-2'>
        <h1 className="text-4xl text-[#1E73BE]">{title}</h1>
        <div className='flex items-center w-full'>
            <div className='grid grid-cols-1 px-4 w-full md:grid-cols-4 gap-4'>
                {products?.map((p:Iproduct)=>(
                    <ProductCart images={p.images} price={p.price} title={p.name} code={p.number} _id={p._id} key={p._id}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default CategoryCard