import React, { useState } from 'react'

import { FiChevronDown, BsCheck2 } from "../../../icons"

import Switch from "react-switch"
import RangeInput from '../RangeInput'

interface LiProps{
    title:string,
    children?:React.ReactNode
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

const SubLi = ({title, children}:LiProps) => (
    <div className='flex justify-between border-b border-gray border-opacity-30 py-3 items-center'>
        <div className='flex items-center gap-2'>
            <FiChevronDown fontSize={18}/>
            <span className='text-base'>{title}</span>
        </div>
        {children}
    </div>
)

function FilterMenu() {
    const [checked, setChecked] = useState(false)
    const checkHandler = (check:boolean) => {
      setChecked(check)
    }

  return (
    <div className='w-[300px] fixed top-1/2 shadow -translate-y-1/2 right-2 rounded-lg py-4 px-5 bg-white z-[9999999] border border-gray'>
              <h1 className='text-xl font-bold'>فیلتر ها</h1>
              <div className='pt-4'>
                <Li  title='دسته بندی'>
                    <div className='pt-4 flex flex-col gap-4 pr-4'>
                        <SubLi title='همه کالاها'><BsCheck2 fontSize={24} className="text-primary"/></SubLi>
                        <SubLi title='لباس'/>
                        <SubLi title='کیف و کفش'/>
                    </div>
                </Li>
                <Li title='محدوده قیمت'>
                    <div className='w-full flex justify-center items-center'>
                        <RangeInput/>
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