import axios from 'axios'
import { GetServerSideProps } from 'next'
import React from 'react'
import { server } from '../../config/server'
import { Iproduct } from '../../interfaces/productInterface'
import ProductDetail from '../../src/components/ProductDetail'
import MainLayout from '../../src/layouts/MainLayout'

interface Props {
    product:Iproduct
}

function SingleProduct({product}:Props) {
  return (
    <MainLayout>
        <div className='px-4 pb-[90px]'>
            <ProductDetail _id={product._id} price={product.price} title={product.name} sizes={product.sizes} images={product.images}/>
        </div>
    </MainLayout>
  )
}



export const getServerSideProps:GetServerSideProps = async (context) => {
    const {id} = context.query
    const res = await axios.get(`${server}/api/products/${id}`)
    const product = res.data
    return {
        props:{
            product
        }
    }
}

export default SingleProduct