import React, { useEffect, useState } from 'react'
import MainLayout from '../../src/layouts/MainLayout'

import { BsSortUpAlt, GiSettingsKnobs } from "../../icons"
import FilterMenu from '../../src/components/FilterMenu'
import { useSelector, useDispatch } from 'react-redux'
import { Iproduct } from '../../interfaces/productInterface'
import ProductCart from '../../src/components/ProductCard'

import { changeSortValue, filterSearchedProducts } from "../../redux/slices/productsReducer"
import usePagination from '../../hooks/usePagination'
import { setPage } from '../../redux/slices/pagination'

function Products() {
    const [showFilterMenu, setShowFilterMenu] = useState(false)
    const { filteredProducts, sort } = useSelector((store: any) => store.products)
    const { page } = useSelector((store: any) => store.pagination)
    const dispatch = useDispatch()
    const sortValues = ['جدید ترین', 'ارزان ترین', 'گران ترین']
    const changeSortValueHandler = (value: string) => {
        dispatch(changeSortValue(value))
        dispatch(filterSearchedProducts())
    }
    useEffect(()=>{
        dispatch(setPage(1))
    },[])
    const [data, paginationButtons] = usePagination(filteredProducts, 18, page)
  return (
    <MainLayout>
            <div className='container mx-auto px-4 py-4'>
                <div className='flex flex-col gap-4 items-center mt-4'>
                  <div className='flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center py-2 bg-white  w-full rounded-lg px-3'>
                      <div className='flex items-center gap-1 text-xs sm:text-sm'>
                        <BsSortUpAlt className='text-base sm:text-[24px]'/>
                        {sortValues.map((sortValue) => (
                            <span key={sortValue} onClick={()=>changeSortValueHandler(sortValue)} className={`cursor-pointer p-1 rounded-lg ${sort === sortValue ? 'bg-primary text-white' : ''}`}>{sortValue}</span>
                        ))}
                        <div onClick={()=>setShowFilterMenu(!showFilterMenu)} className={`flex gap-2 items-center cursor-pointer ${showFilterMenu ? 'text-primary' : ''}`}>
                            <GiSettingsKnobs/>
                            <span>فیلتر</span>
                        </div>
                      </div>
                      <span>نمایش {((page - 1) * 18)+1}–{page*18 > filteredProducts.length ? filteredProducts.length : page*18} از {filteredProducts.length} نتیجه</span>
                  </div>
                  {showFilterMenu && <FilterMenu closeFunction={()=>setShowFilterMenu(false)}/>}
                  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-4 w-full gap-1 sm:gap-2 md:gap-3 lg:gap-4'>
                      {data?.map((p:Iproduct)=>(
                          <ProductCart images={p.images} code={p.number} price={p.price} title={p.name} _id={p._id} key={p._id}/>
                      ))}
                </div>
                    <div className='mt-4'>
                        {paginationButtons}
                    </div>
                </div>
            </div>
            
        </MainLayout>
  )
}

export default Products