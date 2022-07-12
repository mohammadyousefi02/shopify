import React from 'react'

interface Iprops {
    title:string,
    className?:string,
    onClick?:()=>void
}

function MyButton({title,className="",onClick}:Iprops) {
  return (
    <button onClick={onClick} className={`p-2 rounded text-white ${className}`}>{title}</button>
  )
}

export default MyButton