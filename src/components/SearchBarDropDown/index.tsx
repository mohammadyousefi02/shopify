import React from 'react'
import ProductMiniCard from '../ProductMiniCard'
import { useSelector } from "react-redux"
import { Iproduct } from '../../../interfaces/productInterface'
import Link from 'next/link'

interface Props { 
    className?:string,
    onClick?:React.MouseEventHandler
}

function SearchBarDropDown({className="", onClick}:Props) {
    const { filteredProducts } = useSelector((store:any)=>store.products)
  return (
    <div className={`w-full h-[150px] rounded-xl p-4 overflow-y-auto ${className}`} onClick={onClick}>
        {filteredProducts.length > 0 ? filteredProducts.map((p:Iproduct)=>(
            <Link key={p._id} href={{pathname:'/products/[name]',query:{id:p._id}}} as={`/products/${p.name.split(" ").join("-")}`}>
                <a>
                    <ProductMiniCard image={p.images[0]} price={p.price} title={p.name}/> 
                </a>
            </Link>
        )):<div>محصولی یافت نشد</div>}
    </div>
  )
}

export default SearchBarDropDown