import Link from 'next/link'
import React from 'react'
import { BsCart2 } from 'react-icons/bs'
import Button from '../../Button'

function EmptyCart() {
  return (
    <div className='bg-white rounded-lg py-12'>
        <div className='flex flex-col justify-center items-center'>
            <div className='flex items-center'>
                <BsCart2 fontSize={128} className="font-normal"/>
                <p>قبل از مراجعه به صفحه پرداخت شما باید محصولاتی را به سبد خریدتان اضافه نمایید.</p>
            </div>
            <Link href='/'>
                <Button title='بازگشت به فروشگاه' rounded='large' className='px-12'/>
            </Link>
        </div>
    </div>
  )
}

export default EmptyCart