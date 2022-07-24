import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { Icategory } from '../../../interfaces/categoryInterface'
import Button from '../Button'
import Li from '../Li'

import {FiTwitter, FiInstagram, TbBrandTelegram } from "../../../icons"
import SiteInformation from '../SiteInformation'

interface Props {
    setShowSideBar:React.Dispatch<React.SetStateAction<boolean>>
}

function SideBarMenu({setShowSideBar}:Props) {
    const { categories } = useSelector((store:any)=>store.category)
    const router = useRouter()
    function hideSideBar(e:React.MouseEvent<HTMLDivElement, MouseEvent>){
        if(e.currentTarget === e.target){
            setShowSideBar(false)
        }
    }
  return (
    <div className='w-full h-full bg-black bg-opacity-50 fixed top-0 z-[99999] md:hidden' onClickCapture={hideSideBar}>
        <div className='flex flex-col justify-between bg-white w-[300px] h-full px-2'>
            <div>
                <div className='border-b border-gray border-opacity-50'>
                    <Image src='/images/logo.png' width={100} height={100} objectFit={'cover'} alt='logo'/>
                </div>
                <div className='py-4'>
                    <h1 className='font-bold'>دسته بندی ها</h1>
                    <div className='flex flex-col gap-2 mt-2'>
                        {categories.map((category:Icategory)=>(
                            <Li key={category._id} href={{pathname:'/category/[name]',query:{id:category._id}}} as={`/category/${category.name.split(" ").join("-")}`}>
                                <span className={router.query.name === category.name.split(" ").join("-") ? 'text-primary font-bold' : ''}>{category.name}</span>
                            </Li>
                        ))}
                    </div>
                </div>
            </div>
            <div className='border-t border-gray border-opacity-50 py-2'>
                <SiteInformation>
                    <h1 className="text-primary font-bold text-center">شاپیفای</h1>
                </SiteInformation>
            </div>
        </div>
    </div>
  )
}

export default SideBarMenu