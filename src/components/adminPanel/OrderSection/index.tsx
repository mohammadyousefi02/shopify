import React, { useState } from 'react'
import { Iorders } from '../../../../interfaces/orderInterface'
import Button from '../../Button'
import Table from '../../Table'
import OrderTable from '../OrderTable'

interface Props {
    data:Iorders[],
}

function OrderSection({ data }:Props) {
    const buttons = ['ارسال شده', 'در حال ارسال']
    const [selected, setSelected] = useState(buttons[0])
    const changeSelected = (value:string) => {
        setSelected(value)
    }
  return (
    <div className='container mx-auto px-4'>
        <div className='bg-white mt-4 px-4 rounded-lg'>
            <div className='flex justify-between items-center border-b border-gray py-2'>
                <h1>سفارش ها</h1>
                <div className='flex gap-2'>
                    {
                        buttons.map(b=>(
                            <Button key={b} onClick={()=>changeSelected(b)} title={b} color={selected === b ? 'pink' : 'gray'} rounded='normal' className='px-12'/>
                        ))
                    }
                </div>
            </div>
            <OrderTable orders={data}/>
        </div>
    </div>
  )
}

export default OrderSection