import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import Input from '../Input'
import { BiUser, BiUserPlus, IoCartOutline, FaRegHeart } from "../../../icons"
import Badge from '../Badge'
import { useDispatch, useSelector } from 'react-redux'
import Li from '../Li'
import useAuthUserToken from '../../../hooks/useAuthUserToken'
import { Icategory } from '../../../interfaces/categoryInterface'
import SearchBarDropDown from '../SearchBarDropDown'
import { filterProducts, setFilterByNameValue } from '../../../redux/slices/productsReducer'
import { useRouter } from 'next/router'


function Header() {
  const router = useRouter()

  const dispatch = useDispatch()
  const [showSearchBarDropDown, setShowSearchBarDropDown] = useState(false)
  const changeFilteredValueHandler = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterByNameValue(e.target.value))
    dispatch(filterProducts())
  }

  const { filterByNameValue } = useSelector((store:any)=>store.products)

  const {items:savedItems} = useSelector((store:any)=>store.savedItems)
  const {items:cartItems} = useSelector((store:any)=>store.cart)
  const {categories} = useSelector((store:any)=>store.category)
  const [ token ] = useAuthUserToken()
  return (
    <>
    
    <div className="bg-white" onClick={()=>setShowSearchBarDropDown(false)}>
        <div className='container mx-auto px-4'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col justify-between items-center w-full py-8 md:p-0 md:flex-row'>
                <div className='hidden md:block'>
                  <Image src='/images/logo.png' width={180} height={120} objectFit='contain' alt="logo"/>
                </div>
                <div className='w-full md:max-w-[500px] flex-1  flex flex-col relative z-[999]'>
                  <div className='relative md:translate-x-6'>
                    <Input placeholder='جستجو در محصولات...' onInput={()=>setShowSearchBarDropDown(true)} value={filterByNameValue} onChange={changeFilteredValueHandler}/>
                    {showSearchBarDropDown && <SearchBarDropDown className='bg-[#f2f2f2] shadow-lg absolute mt-1 z-[999]'/>}
                  </div>
                </div>
                <Li href='/profile' className='hidden md:flex items-center gap-2' >
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
                  ):<>
                      <div className='flex items-center gap-2'>
                        <BiUser/>
                        <span className='whitespace-nowrap'>حساب کاربری</span>
                      </div>
                    </>}
                </Li>
              </div>
            </div>
        </div>
    </div>
    <div className='bg-white sticky top-0 py-4 z-50 hidden md:block'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center gap-4'>
            <Li href='/'>صفحه اصلی</Li>
            <Li>ارتباط با ما</Li>
            {categories.map((category:Icategory)=>(
              <Li key={category._id} href={{pathname:'/category/[name]',query:{id:category._id}}} as={`/category/${category.name.split(" ").join("-")}`}>
                <span className={router.query.name === category.name.split(" ").join("-") ? 'text-primary font-bold' : ''}>{category.name}</span>
              </Li>
            ))}
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