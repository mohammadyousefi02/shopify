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
                <h1 className="text-2xl sm:text-4xl mr-2">{title}</h1>
            </a>
        </Link>
        <div className='flex items-center w-full'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-4 w-full gap-1 sm:gap-2 md:gap-3 lg:gap-4'>
                {products?.map((p:Iproduct)=>(
                    <ProductCart images={p.images} price={p.price} title={p.name} code={p.number} _id={p._id} key={p._id}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default CategoryCard