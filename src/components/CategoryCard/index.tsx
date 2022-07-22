import Link from 'next/link'
import React from 'react'
import { Iproduct } from '../../../interfaces/productInterface'
import ProductCart from '../ProductCard'

interface Props {
    title:string,
    products: Iproduct[],
    id:string
}

function CategoryCard({title, products, id}:Props) {
  return (
    <div className='w-full flex flex-col items-start gap-2'>
        <Link href={{ pathname:'/category/[name]', query:{id} }} as={`/category/${title.split(" ").join("-")}`}>
            <a>
                <h1 className="text-4xl">{title}</h1>
            </a>
        </Link>
        <div className='flex items-center w-full'>
            <div className='grid grid-cols-1 px-4 w-full md:grid-cols-6 gap-4'>
                {products?.map((p:Iproduct)=>(
                    <ProductCart images={p.images} price={p.price} title={p.name} code={p.number} _id={p._id} key={p._id}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default CategoryCard