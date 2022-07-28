import React, { useEffect, useState } from 'react'
import MainLayout from '../../src/layouts/MainLayout'

import { useRouter } from 'next/router'

import { BsSortUpAlt, FiChevronDown, BsCheck2, GiSettingsKnobs } from "../../icons"

import { useSelector, useDispatch } from 'react-redux'

import { setProductsByCategory, sortProductsByCategory, changeCategorySortValue } from '../../redux/slices/productsReducer'
import { Iproduct } from '../../interfaces/productInterface'
import ProductCart from '../../src/components/ProductCard'
import Switch from "react-switch"
import FilterMenu from '../../src/components/FilterMenu'
import { setPage } from '../../redux/slices/pagination'
import usePagination from '../../hooks/usePagination'

function Category() {
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(()=>{
    const name:string = router.query.name as string;
    dispatch(setProductsByCategory(name.split('-').join(' ')))
  },[router.query.name])
  const { productsByCategory, categorySort} = useSelector((store:any)=>store.products)
  const { page } = useSelector((store:any)=>store.pagination)
  const sortOptions = ['جدید ترین', 'ارزان ترین', 'گران ترین']
  const changeSortValueHandler = (value: string) => {
    dispatch(changeCategorySortValue(value))
    dispatch(sortProductsByCategory())
}

useEffect(()=>{
  dispatch(setPage(1))
},[])
const [data, paginationButtons] = usePagination(productsByCategory, 18, page)
  return (
    <div>
        <MainLayout>
            <div className='container mx-auto px-4 py-4'>
                <div className='flex flex-col gap-4 items-center mt-4'>
                  <div className='flex justify-between items-center bg-white h-[48px] w-full rounded-lg px-3'>
                      <div className='flex items-center gap-4'>
                        <BsSortUpAlt fontSize={24}/>
                        {sortOptions.map(sortValue=>(
                          <span key={sortValue} onClick={()=>changeSortValueHandler(sortValue)} className={`cursor-pointer p-1 rounded-lg ${categorySort === sortValue ? 'bg-primary text-white' : ''}`}>{sortValue}</span>
                        ))}
                      <div onClick={()=>setShowFilterMenu(!showFilterMenu)} className={`flex gap-2 items-center cursor-pointer ${showFilterMenu ? 'text-primary' : ''}`}>
                            <GiSettingsKnobs/>
                            <span>فیلتر</span>
                        </div>
                      </div>
                      <span>نمایش {((page - 1) * 18)+1}–{page*18 > productsByCategory.length ? productsByCategory.length : page*18} از {productsByCategory.length} نتیجه</span>
                  </div>
                  {showFilterMenu && <FilterMenu categoryFilter={false} closeFunction={()=>setShowFilterMenu(false)}/>}
                  <div className='grid grid-cols-1 w-full md:grid-cols-6 gap-4'>
                      {data?.map((p:Iproduct)=>(
                          <ProductCart images={p.images} code={p.number} price={p.price} title={p.name} _id={p._id} key={p._id}/>
                      ))}
                </div>
                  <div>
                    {paginationButtons}
                  </div>
                </div>
            </div>
            
        </MainLayout>
    </div>
  )
}

export default Category