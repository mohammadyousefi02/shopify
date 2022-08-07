import React from 'react'
import Button from '../src/components/Button'
import CartCard from '../src/components/cart/CartCard'
import Header from '../src/components/Header/index'
import Input from '../src/components/Input'
import ProductCart from '../src/components/ProductCard'
import ProductMiniCard from '../src/components/ProductMiniCard'

function Component() {
  return (
    <div className='p-4 flex flex-col gap-4'>
        <Header/>
        <Input placeholder='تست'/>
        <ProductCart _id='1' images={['/images/dress1.jpg']} price="20" title='test'/>
        <Button title='test' color='blue'/>
        <Button title='test' color='blue' outline={true}/>
        <Button title='test' color='green'/>
        <Button title='test' color="red"/>
        <Button title='test' color='gray'/>
        <Button title='test' rounded='normal'/>
        <ProductMiniCard image='/images/dress-8.jpg' title='مانتو' price='270000'/>
        {/* <CartCard/> */}
    </div>
  )
}

export default Component