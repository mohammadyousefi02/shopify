import Image from 'next/image'
import React from 'react'
import Input from '../Input'
import { BiUser, BiUserPlus, IoCartOutline, FaRegHeart } from "../../../icons"
import Badge from '../Badge'
import { useSelector } from 'react-redux'
import Li from '../Li'
import useAuthUserToken from '../../../hooks/useAuthUserToken'

interface Props {
  inpValue?:string,
  onChange?:React.ChangeEventHandler
}

function Header({inpValue, onChange}:Props) {
  const {items:savedItems} = useSelector((store:any)=>store.savedItems)
  const {items:cartItems} = useSelector((store:any)=>store.cart)
  const [ token ] = useAuthUserToken()
  return (
    <>
    
    <div className="bg-white">
        <div className='container mx-auto px-4'>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center w-full'>
                <Image src='/images/logo.png' width={180} height={120} className="translate-x-14" objectFit='contain' alt="logo"/>
                <div className='w-[500px] translate-x-6'>
                  <Input placeholder='جستجو در محصولات...' value={inpValue} onChange={onChange}/>
                </div>
                <div className='flex items-center gap-2'>
                  {!token ? (
                    <>
                      <div className='flex items-center gap-1'>
                        <BiUser/>
                        <span>ورود</span>
                      </div>
                      <span>/</span>
                      <div className='flex items-center gap-1'>
                        <BiUserPlus fontSize={18}/>
                        <span className='whitespace-nowrap'>ثبت نام</span>
                      </div>
                    </>
                  ):<Li href='/profile'>
                      <div className='flex items-center gap-2'>
                        <BiUser/>
                        <span className='whitespace-nowrap'>حساب کاربری</span>
                      </div>
                    </Li>}
                </div>
              </div>
            </div>
        </div>
    </div>
    <div className='bg-white sticky top-0 py-4 z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center gap-4'>
            <Li href='/'>صفحه اصلی</Li>
            <Li>ارتباط با ما</Li>
          </div>
          <div className='flex items-center gap-4'>
            <Li href='/saved'>
              <div className='relative'>
                <FaRegHeart fontSize={24}/>
                <Badge number={savedItems.length}/>
              </div>
            </Li>
            <Li href='/cart'>
              <div className='relative'>
                <IoCartOutline fontSize={24}/>
                <Badge number={cartItems.length}/>
              </div>
            </Li>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Header