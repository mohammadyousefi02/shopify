import React, { useEffect } from 'react'
import MainLayout from '../../src/layouts/MainLayout'

import { useRouter } from 'next/router'

import { useSelector, useDispatch } from 'react-redux'

import { setProductsByCategory } from '../../redux/slices/productsReducer'
import { Iproduct } from '../../interfaces/productInterface'
import ProductCart from '../../src/components/ProductCard'

function Category() {
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setProductsByCategory(router.query.name))
  },[router.query.name])
  const { productsByCategory } = useSelector((store:any)=>store.products)
  return (
    <div>
        <MainLayout>
            <div className='pb-[90px]'>
                <div className='flex justify-center mt-4'>
                  <div className='grid grid-cols-1 px-4 w-full md:grid-cols-4 gap-4'>
                      {productsByCategory?.map((p:Iproduct)=>(
                          <ProductCart images={p.images} price={p.price} title={p.name} _id={p._id} key={p._id}/>
                      ))}
                </div>
                </div>
            </div>
        </MainLayout>
    </div>
  )
}

export default Category