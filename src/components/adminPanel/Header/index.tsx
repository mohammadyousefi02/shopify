import React from 'react'
import Button from '../../Button'
import Li from '../../Li'

function Header() {
  return (
    <div className='bg-white pt-2'>
        <div className='container mx-auto px-4'>
            <div className='flex flex-col justify-between'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold'>پنل مدیریتی</h1>
                    <Button title='خروج' color='pink' rounded='normal' className='w-16'/>
                </div>
                <div className='flex items-center gap-4 pt-4 pb-2'>
                    <Li className='text-primary'>دسته بندی ها</Li>
                    <Li>دسته بندی ها</Li>
                    <Li>دسته بندی ها</Li>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header