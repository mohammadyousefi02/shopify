import React from 'react'

import classNames from "classnames"

interface Iprops {
    title:string,
    className?:string,
    onClick?:React.MouseEventHandler,
    color?: 'blue' | 'green' | 'red' | 'gray' | 'pink',
    outline?:boolean,
    rounded?: 'normal' | 'large'
}

function Button({title,className="",color="blue",outline=false,rounded="normal",onClick}:Iprops) {
  const btnClasses = classNames(
    `px-2 py-3 text-white transition duration-75`,
    color === "blue" && !outline ? 'bg-[#1E73EE] hover:bg-[#1E73BE]':'',
    color === "blue" && outline ? 'bg-transparent border border-[#1E73BE] text-[#1E73BE] hover:bg-[#1E73BE] hover:text-white': '',
    color === "green" ? 'bg-[#56B261] hover:bg-[#1E7E34]' : '',
    color === "red" ? 'bg-red-400 hover:bg-red-500' : '',
    color === "gray" ? 'bg-gray' : '',
    rounded === "large" ? 'rounded-[24px]' : 'rounded-[12px]', 
    color === "pink" ? 'bg-[#EE384E]' : '' ,
    className
  )
  return (
    <button onClick={onClick} className={btnClasses}>{title}</button>
  )
}

export default Button