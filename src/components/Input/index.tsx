import React, { Attributes } from 'react'

import classNames from "classnames"

interface Iprops extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement> {
    id?:string,
    placeholder?:string,
    type?:string,
    className?:string,
    label?:false | string,
    rounded?: 'normal' | 'large'
}

function Input({id="",label=false,type="text",className="",rounded="large",...attr}:Iprops) {

  const inputClasses = classNames(
    'px-3 py-2 outline-0 bg-[#EBEBEB]',
    'placeholder:text-[#84777D] text-[#58585A]',
    rounded==="large" ? 'rounded-[24px]' : 'rounded-[12px]',
    className
  )
    
  return (
    <div className={`flex flex-col gap-1 w-full`}>
        {label && <label htmlFor={id}>{label}</label>}
        <input dir='auto' type={type} {...attr} className={inputClasses} id={id} />
    </div>
  )
}

export default Input