import React from 'react'
import Button from '../src/components/Button'
import ProductCart from '../src/components/ProductCard'

function Component() {
  return (
    <div className='p-4 flex flex-col gap-4'>
        <ProductCart _id='1' images={['/images/dress1.jpg']} price="20" title='test'/>
        <Button title='test' color='blue'/>
        <Button title='test' color='blue' outline={true}/>
        <Button title='test' color='green'/>
        <Button title='test' color="red"/>
        <Button title='test' color='gray'/>
        <Button title='test' rounded='normal'/>
    </div>
  )
}

export default Component