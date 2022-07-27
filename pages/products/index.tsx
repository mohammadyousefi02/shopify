import React, { useState } from 'react'
import MainLayout from '../../src/layouts/MainLayout'

import { BsSortUpAlt, GiSettingsKnobs } from "../../icons"
import FilterMenu from '../../src/components/FilterMenu'
import { useSelector, useDispatch } from 'react-redux'
import { Iproduct } from '../../interfaces/productInterface'
import ProductCart from '../../src/components/ProductCard'

import { changeSortValue, filterSearchedProducts } from "../../redux/slices/productsReducer"

function Products() {
    const [showFilterMenu, setShowFilterMenu] = useState(false)
    const { filteredProducts, sort } = useSelector((store: any) => store.products)
    const dispatch = useDispatch()
    const sortValues = ['جدید ترین', 'ارزان ترین', 'گران ترین']
    const changeSortValueHandler = (value: string) => {
        dispatch(changeSortValue(value))
        dispatch(filterSearchedProducts())
    }
  return (
    <MainLayout>
            <div className='container mx-auto px-4 pb-[90px]'>
                <div className='flex flex-col gap-4 items-center mt-4'>
                  <div className='flex justify-between items-center bg-white h-[48px] w-full rounded-lg px-3'>
                      <div className='flex items-center gap-4'>
                        <BsSortUpAlt fontSize={24}/>
                        {sortValues.map((sortValue) => (
                            <span key={sortValue} onClick={()=>changeSortValueHandler(sortValue)} className={`cursor-pointer p-1 rounded-lg ${sort === sortValue ? 'bg-primary text-white' : ''}`}>{sortValue}</span>
                        ))}
                        <div onClick={()=>setShowFilterMenu(!showFilterMenu)} className={`flex gap-2 items-center cursor-pointer ${showFilterMenu ? 'text-primary' : ''}`}>
                            <GiSettingsKnobs/>
                            <span>فیلتر</span>
                        </div>
                      </div>
                      <span>نمایش 1–12 از 1671 نتیجه</span>
                  </div>
                  {showFilterMenu && <FilterMenu closeFunction={()=>setShowFilterMenu(false)}/>}
                  <div className='grid grid-cols-1 w-full md:grid-cols-6 gap-4'>
                      {filteredProducts?.map((p:Iproduct)=>(
                          <ProductCart images={p.images} code={p.number} price={p.price} title={p.name} _id={p._id} key={p._id}/>
                      ))}
                </div>
                </div>
            </div>
            
        </MainLayout>
  )
}

export default Products