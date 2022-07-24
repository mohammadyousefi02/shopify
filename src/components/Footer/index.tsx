import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useGetUserId from '../../../hooks/useGetUserId'
import { useSelector } from 'react-redux'
import {RiHome2Line, RiHome2Fill, FaRegHeart, FaHeart, IoCartOutline, IoCart, RiUser6Line, RiUser6Fill, FiTwitter,
  FiInstagram, TbBrandTelegram
} from "../../../icons"
import Image from 'next/image'
import Li from '../Li'
import Button from '../Button'
import SiteInformation from '../SiteInformation'

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
    <div className='bg-white p-4 pb-[48px]'>
      <div className='container mx-auto'>
        <div className='flex flex-col gap-6'>
        <div className='flex justify-around'>
          <div className='flex flex-col gap-2 text-base'>
            <h1 className='font-bold'>خدمات مشتریان</h1>
            <Li className='text-gray'>پاسخ به پرسش های متدوال</Li>
            <Li className='text-gray'>رویه های بازگرداندن کالا</Li>
            <Li className='text-gray'>شرایط استفاده</Li>
            <Li className='text-gray'>حریم خصوصی</Li>
            <Li className='text-gray'>گزارش باگ</Li>
          </div>
          <div className='flex flex-col gap-2 text-base'>
            <h1 className='font-bold'>اطلاعات شاپیفای</h1>
            <Li className='text-gray'>درباره شاپیفای</Li>
            <Li className='text-gray'>تماس با شاپیفای</Li>
            <Li className='text-gray'>همکاری با شاپیفای</Li>
          </div>
          <SiteInformation className='flex-[0.2] hidden md:flex'/>
        </div>
        <div className="flex flex-col md:flex-row md:justify-around items-center">
          <div className="flex flex-col gap-3 flex-[0.5]">
            <h1 className='font-bold'>فروشگاه اینترنتی شاپیفای، بررسی، انتخاب و خرید آنلاین</h1>
            <p className='text-gray'>یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمانی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی که فروشگاه اینترنتی شاپیفای سال‌هاست بر روی آن‌ها کار کرده و توانسته از این طریق مشتریان ثابت خود را داشته باشد.</p>
          </div>
          <div className='flex items-center gap-2 justify-end'>
            <div className='border border-gray py-1 rounded-lg'>
              <Image src='/images/rezi.png' width={100} height={100} objectFit="contain" alt='نشان ملی'/>
            </div>
            <div className='border border-gray py-1 rounded-lg'>
              <Image src='/images/kasbokar.png' width={100} height={100} objectFit="contain" alt='کسب و کار'/>
            </div>
            <div className='border border-gray py-1 rounded-lg'>
              <Image src='/images/enamad.png' width={100} height={100} objectFit="contain" alt='نماد اعتماد'/>
            </div>
          </div>
        </div>
        <div className='border-t border-gray flex justify-center items-center pt-4 pb-2'>
            <p className='text-primary font-bold'>تمام حقوق اين وب‌ سايت نیز برای شاپیفای نیست.</p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Footer