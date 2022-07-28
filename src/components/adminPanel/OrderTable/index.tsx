import React, { useEffect, useState } from 'react'

import { MdVisibility } from "../../../../icons"
import { useDispatch, useSelector } from 'react-redux'
import usePagination from '../../../../hooks/usePagination'
import { Iorders } from '../../../../interfaces/orderInterface'

import { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

interface Props {
    orders:Iorders[]
    onDelete?:(id: string) => void,
    onEdit?:(id: string, name: string) => void
}

function OrderTable({orders, onEdit, onDelete}:Props) {
    const dispatch = useDispatch()
    const { page } = useSelector((state:any) => state.pagination)
    const [data, paginationButtons] = usePagination(orders, 5, page)
    
  return (
    <div>
        <table className='w-full'>
        <thead className="border-b border-gray">
            <tr>
                <th>نام</th>
                <th>مجموع مبلغ</th>
                <th>زمان ثبت سفارش</th>
                <th>عملکردها</th>
            </tr>
        </thead>
        <tbody>
            {data.map((d:Iorders)=>(
                <tr key={d._id}>
                    <td>{d.customer.name}</td>
                    <td>{d.order.total.toLocaleString('fa')} تومان</td>
                    <td>{new DateObject({date:d.order.createdAt,calendar:persian,locale: persian_fa}).format()}</td>
                    <td>
                        <div className='flex gap-1 text-base'>
                            <div className='bg-primary cursor-pointer p-1 rounded'>
                                <MdVisibility color='#fff'/>
                            </div>
                        </div>
                    </td>
            </tr>
            ))}
        </tbody>
        </table>
        <div className='flex justify-center items-center gap-1 mt-4 py-2'>
              {paginationButtons}
        </div>
    </div>
  )
}

export default OrderTable