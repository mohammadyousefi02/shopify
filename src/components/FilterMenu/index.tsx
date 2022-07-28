import React, { useState } from 'react'

import { FiChevronDown, BsCheck2, MdClose } from "../../../icons"

import Switch from "react-switch"
import RangeInput from '../RangeInput'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { server } from '../../../config/server'
import { Icategory } from '../../../interfaces/categoryInterface'
import { useDispatch, useSelector } from "react-redux"
import { changeFilterByCategoryValue, filterSearchedProducts, changeCategoryPriceRange, sortProductsByCategory, changesearchPriceRange } from "../../../redux/slices/productsReducer"


interface LiProps{
    title:string,
    children?:React.ReactNode,
    onClick?:()=>void,
}
const Li = ({title, children}:LiProps) => (
    <div className='flex flex-col py-4 border-b border-gray border-opacity-30 '>
        <div className='flex justify-between items-center'>
            <span className='text-base font-bold'>{title}</span>
            <FiChevronDown fontSize={18} className="text-gray"/>
        </div>
        {children}
    </div>
)

const SubLi = ({title, children, onClick}:LiProps) => (
    <div onClick={onClick} className='flex justify-between border-b cursor-pointer border-gray border-opacity-30 py-3 items-center'>
        <div className='flex items-center gap-2'>
            <FiChevronDown fontSize={18}/>
            <span className='text-base'>{title}</span>
        </div>
        {children}
    </div>
)

interface Props {
    closeFunction:()=>void,
    categoryFilter?:Boolean
}

function FilterMenu({closeFunction, categoryFilter=true}:Props) {
    const dispatch = useDispatch()
    const { categories } = useSelector((store: any) => store.category) 
    const { filterByCategoryValue, categoryMinPrice, categoryMaxPrice, searchMinPrice, searchMaxPrice } = useSelector((store: any) => store.products) 
    const [checked, setChecked] = useState(false)
    const checkHandler = (check:boolean) => {
      setChecked(check)
    }

    const changeFilterValue = (value:string) => {
        dispatch(changeFilterByCategoryValue(value))
        dispatch(filterSearchedProducts())
    }

    const categoriesOption:string[] = ['همه کالاها', ...categories.map((c:Icategory)=>{
        return c.name
    })]

    const onMinChange = (value:string) => {
        if(categoryFilter){
            dispatch(changesearchPriceRange({min:value}))
            dispatch(filterSearchedProducts())
        }else{
            dispatch(changeCategoryPriceRange({min:value}))
            dispatch(sortProductsByCategory())
        }
    }
    const onMaxChange = (value:string) => {
        if(categoryFilter){
            dispatch(changesearchPriceRange({max:value}))
            dispatch(filterSearchedProducts())
        }else{
            dispatch(changeCategoryPriceRange({max:value}))
            dispatch(sortProductsByCategory())
        }
    }
  return (
    <div className='w-[300px] fixed top-1/2 shadow -translate-y-1/2 right-2 rounded-lg py-4 px-5 bg-white z-[9999999] border border-gray'>
              <div className='flex justify-between items-center'>
                <h1 className='text-xl font-bold'>فیلتر ها</h1>
                <MdClose fontSize={24} className="cursor-pointer" onClick={closeFunction}/>
              </div>
              <div className='pt-4'>
                {categoryFilter && (
                    <Li  title='دسته بندی'>
                        <div className='pt-4 flex flex-col gap-4 pr-4'>
                            {categoriesOption?.map(category=>(
                                <SubLi onClick={()=>changeFilterValue(category)} key={category} title={category}>
                                    {filterByCategoryValue === category && <BsCheck2 fontSize={24} className="text-primary"/>}
                                </SubLi>
                            ))}
                        </div>
                    </Li>
                )}
                <Li title='محدوده قیمت'>
                    <div className='w-full py-1 flex justify-center items-center'>
                        <RangeInput max={500000}
                            minValue={categoryFilter ? searchMinPrice : categoryMinPrice}
                            maxValue={categoryFilter ? searchMaxPrice : categoryMaxPrice}
                            onMinChange={onMinChange}
                            onMaxChange={onMaxChange}
                        />
                    </div>
                </Li>
                <div className='flex py-4 justify-between items-center border-opacity-30'>
                  <span className='text-base font-bold'>فقط کالاهای موجود</span>
                  <Switch onChange={checkHandler} checked={checked} onColor="#EE384E" dir='ltr'/>
                </div>
              </div>
            </div>
  )
}

export default FilterMenu

export const getServerSideProps:GetServerSideProps = async()=>{
    const categories = await axios.get(`${server}/api/categories`)
    return {
        props:{
            categories:categories.data
        }
    }
}