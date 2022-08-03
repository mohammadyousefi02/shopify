import React from 'react'
import { Iproduct } from '../../../../interfaces/productInterface'
import ProductCart from '../../ProductCard'

interface Props {
    products:Iproduct[]
}

function RelativeProduct({products}:Props) {
  return (
    <div className='py-4'>
        <h1 className='text-2xl sm:text-4xl mr-2 my-4'>محصولات مرتبط</h1>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-4 w-full gap-1 sm:gap-2 md:gap-3 lg:gap-4'>
            {products.map((p:Iproduct)=>(
                <ProductCart images={p.images} code={p.number} price={p.price} title={p.name} _id={p._id} key={p._id}/>
            ))}
        </div>
    </div>
  )
}

export default RelativeProduct