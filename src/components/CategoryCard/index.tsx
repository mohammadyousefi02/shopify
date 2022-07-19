import React from 'react'
import { Iproduct } from '../../../interfaces/productInterface'
import ProductCart from '../ProductCard'

interface Props {
    title:string,
    products: Iproduct[]
}

function CategoryCard({title, products}:Props) {
  return (
    <div>
        <h1>{title}</h1>
        <div>
        <div className='grid grid-cols-1 px-4 md:grid-cols-4 gap-4'>
              {products?.map((p:Iproduct)=>(
                  <ProductCart images={p.images} price={p.price} title={p.name} _id={p._id} key={p._id}/>
              ))}
            </div>
        </div>
    </div>
  )
}

export default CategoryCard