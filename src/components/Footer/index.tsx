import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useGetUserId from '../../../hooks/useGetUserId'
import { useSelector } from 'react-redux'
import {RiHome2Line, RiHome2Fill, FaRegHeart, FaHeart, IoCartOutline, IoCart, RiUser6Line, RiUser6Fill} from "../../../icons"

const links = [
  {icon:RiHome2Line,active:RiHome2Fill,path:'/',id:1},
  {icon:FaRegHeart,active:FaHeart,path:'/saved',id:3},
  {icon:IoCartOutline,active:IoCart,path:'/cart',id:4},
  {icon:RiUser6Line,active:RiUser6Fill,path:'/profile',id:5}
]

function Footer() {
  const {items:savedItems} = useSelector((store:any)=>store.savedItems)
  const {items:cartItems} = useSelector((store:any)=>store.cart)
  const router = useRouter()
  const userId = useGetUserId()
  return (
    <div className='h-[80px] w-full bg-white fixed bottom-0 shadow rounded-t-[40px] flex justify-center items-center gap-12 text-[24px]'>
          {links.map(link=>(
            <div className='relative' key={link.id}>
            <Link  href={{pathname:link.path , query:{id:userId._id}}} as={link.path} shallow={true} >
              {router.pathname === link.path ? <link.active className={`text-slate-600 text-[28px]`}/> : <link.icon color="#B7B7B7"/>}
            </Link>
            {link.path === "/saved" ? <span className='absolute bottom-[-4px] right-[-4px] text-[10px] px-[5px] bg-[#1e73be] rounded-full text-white '>{savedItems.length}</span>:
              link.path === "/cart" ? <span className='absolute bottom-[-4px] right-[-4px] text-[10px] px-[5px] bg-[#1e73be] rounded-full text-white '>{cartItems.length}</span>:""
            }
            </div>
          ))}
    </div>
  )
}

export default Footer