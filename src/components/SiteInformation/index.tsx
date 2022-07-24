import React from 'react'
import { FiTwitter, FiInstagram, TbBrandTelegram } from '../../../icons'
import Button from '../Button'

interface Props {
    children?:React.ReactNode,
    className?:string
}

function SiteInformation({children, className}:Props) {
  return (
    <div className={`flex flex-col gap-4 ${className}`} >
        <div>
            <span>تلفن: </span>
            <span dir='ltr'>021-12345678</span>
        </div>
        <div className='flex items-center justify-between text-primary text-xl'>
            <FiTwitter/>
            <FiInstagram/>
            <TbBrandTelegram/>
        </div>
        <div>
            <h1>ثبت نام در خبرنامه شاپیفای</h1>
            <div className='flex w-full'>
                <input type='text' className='border border-gray rounded-r-xl w-full focus:border-primary outline-none p-2' placeholder='ایمیل خود را وارد کنید'/>
                <Button title='ثبت' color='pink' className='rounded-none rounded-l-xl'/>
            </div>
        </div>
        {children}
    </div>
  )
}

export default SiteInformation