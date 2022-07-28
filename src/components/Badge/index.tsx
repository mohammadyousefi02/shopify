import React from 'react'

import classNames from "classnames"

interface Props {
    number:number,
    className?:string
}

//bg-[#1E73BE]

function Badge({number,className}:Props) {
   const badgeClasses = classNames(
        'absolute bottom-0 right-[-4px] text-[10px] pt-[2px] w-[14px] h-[14px] bg-primary flex items-center justify-center rounded-full text-white',
        className
    )
  return (
    <span className={badgeClasses}>{number.toLocaleString('fa')}</span>
  )
}

export default Badge