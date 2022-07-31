import React from 'react'
import { Iproduct } from '../../../../interfaces/productInterface'
import ProductCart from '../../ProductCard'

interface Props {
    products:Iproduct[]
}

function RelativeProduct({products}:Props) {
  return (
    <div className='py-4'>
        <h1 className='text-4xl my-4'>محصولات مرتبط</h1>
        <div className='grid grid-cols-1 w-full md:grid-cols-6 gap-4'>
            {products.map((p:Iproduct)=>(
                <ProductCart images={p.images} code={p.number} price={p.price} title={p.name} _id={p._id} key={p._id}/>
            ))}
        </div>
    </div>
  )
}

export default RelativeProduct