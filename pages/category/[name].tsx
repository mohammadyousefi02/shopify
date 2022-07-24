import React, { useEffect, useState } from 'react'
import MainLayout from '../../src/layouts/MainLayout'

import { useRouter } from 'next/router'

import { BsSortUpAlt, FiChevronDown, BsCheck2 } from "../../icons"

import { useSelector, useDispatch } from 'react-redux'

import { setProductsByCategory } from '../../redux/slices/productsReducer'
import { Iproduct } from '../../interfaces/productInterface'
import ProductCart from '../../src/components/ProductCard'
import Switch from "react-switch"
import FilterMenu from '../../src/components/FilterMenu'

function Category() {
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(()=>{
    const name:string = router.query.name as string;
    dispatch(setProductsByCategory(name.split('-').join(' ')))
  },[router.query.name])
  const { productsByCategory } = useSelector((store:any)=>store.products)
  return (
    <div>
        <MainLayout>
            <div className='container mx-auto px-4 pb-[90px]'>
                <div className='flex flex-col gap-4 items-center mt-4'>
                  <div className='flex justify-between items-center bg-white h-[48px] w-full rounded-lg px-3'>
                      <div className='flex items-center gap-4'>
                        <BsSortUpAlt fontSize={24}/>
                        <span className='text-white cursor-pointer bg-primary p-1 rounded-lg'>جدید ترین</span>
                        <span className='cursor-pointer'>ارزان ترین</span>
                        <span className='cursor-pointer'>گران ترین</span>
                      </div>
                      <span>نمایش 1–12 از 1671 نتیجه</span>
                  </div>
                  <FilterMenu/>
                  <div className='grid grid-cols-1 w-full md:grid-cols-6 gap-4'>
                      {productsByCategory?.map((p:Iproduct)=>(
                          <ProductCart images={p.images} code={p.number} price={p.price} title={p.name} _id={p._id} key={p._id}/>
                      ))}
                </div>
                </div>
            </div>
            
        </MainLayout>
    </div>
  )
}

export default Category