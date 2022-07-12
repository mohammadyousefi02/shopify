import React, { Attributes } from 'react'

interface Iprops extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement> {
    name:string,
    placeholder?:string,
    type?:string,
    className?:string,
}

function MyInput({name,type="text",className="",...attr}:Iprops) {
    
  return (
    <div className={`flex flex-col gap-1 w-full`}>
        <label htmlFor={name}>{ name} :</label>
        <input type={type} {...attr} className={`px-1 py-2 rounded ${className}`} id={name}  />
    </div>
  )
}

export default MyInput