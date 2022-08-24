import { useRouter } from 'next/router'
import React from 'react'
import useAuthUserToken from '../../../../hooks/useAuthUserToken'
import Button from '../../Button'
import Li from '../../Li'

function Header() {
    const router = useRouter()
    const [token, setToken, deleteToken] = useAuthUserToken()
    const headerLinks = [
        {title:'دسته بندی', link:'/admin/categories'},
        {title:'محصولات', link:'/admin/products'},
        {title:'سفارش ها', link:'/admin/orders'},
    ]
  return (
    <div className='bg-white pt-4 h-full min-w-[248px]'>
        <div className='container mx-auto px-4'>
            <div className='flex flex-col justify-between'>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold'>پنل مدیریتی</h1>
                    <Button onClick={()=>deleteToken()} title='خروج' color='pink' rounded='normal' className='w-16'/>
                </div>
                <div className='flex flex-col gap-5 pt-4 pb-2'>
                    {headerLinks.map(({title, link}) => (
                        <Li key={title} className={router.pathname === link ? "text-primary" : ''} href={link}>{title}</Li>
                        ))}
                        <Li href={'/'}>خانه</Li>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header