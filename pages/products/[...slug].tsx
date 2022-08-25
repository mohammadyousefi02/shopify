import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import { server } from '../../config/server'
import { Iproduct } from '../../interfaces/productInterface'
import ProductDetail from '../../src/components/ProductDetail'
import RelativeProduct from '../../src/components/SingleProduct/RelativeProducts'
import MainLayout from '../../src/layouts/MainLayout'
import {useSelector, useDispatch} from "react-redux"
import { setProductsByCategory } from '../../redux/slices/productsReducer'
import _ from 'lodash'
import Comments from '../../src/components/SingleProduct/Comments'

interface Props {
    product:Iproduct
}

function SingleProduct({product}:Props) {
    const [relativeProducts, setRelativeProducts] = useState<Iproduct[]>([])
    const dispatch = useDispatch()
    const {productsByCategory,products} = useSelector((store:any)=>store.products)
    useEffect(()=>{
        dispatch(setProductsByCategory(product.category))
    },[products])
    useEffect(()=>{
        const relativeProducts:Iproduct[] = _.take(productsByCategory, 6)
        setRelativeProducts(relativeProducts)
    },[productsByCategory])
  return (
    <MainLayout>
        <div className='container mx-auto px-4 mt-9 pb-[90px]'>
            <ProductDetail _id={product._id} star={product.star} code={product.number} category={product.category} price={product.price} title={product.name} sizes={product.sizes} images={product.images}/>
            <RelativeProduct products={relativeProducts}/>
            <Comments id={product._id} />
        </div>
    </MainLayout>
  )
}



export const getServerSideProps:GetServerSideProps = async (context) => {
    const slug:string[] = context.query.slug as string[]
    const res = await axios.get(`${server}/api/products/${slug[0]}`)
    const product = res.data
    return {
        props:{
            product
        }
    }
}

export default SingleProduct