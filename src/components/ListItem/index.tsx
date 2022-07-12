import Link from 'next/link'
import React, { ElementType } from 'react'
import { Iuser } from '../../../interfaces/userInterface'

interface Iprops {
    title:string,
    color?:string,
    Icon:ElementType,
    href?:string,
    as?:string,
    query?:object
}

function CategoryCard({title,color="",Icon,href="",as="",query={}}:Iprops) {
    const textColor = `${color === "red" ? "text-red-500" : color === "blue" ? "text-blue-500" : color === "green" ? "text-green-500" : 
        color === "yellow" ? "text-yellow-500"
    : ""}`
  return (
    <Link href={{pathname:href,query:{...query}}} as={as || href}>
      <div className={`flex justify-between items-center ${textColor} p-2 bg-white rounded-md`}>
        <h1 className='font-bold'>{title}</h1>
        <Icon fontSize={24}/>
      </div>
    </Link>
  )
}

export default CategoryCard