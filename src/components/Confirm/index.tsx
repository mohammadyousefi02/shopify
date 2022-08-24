import React from 'react'

import { MdClose } from '../../../icons'
import Button from '../Button'

interface Props {
    onClose: () => void,
    onConfirm: () => void
}

function Confirm({onClose, onConfirm}: Props) {
  return (
    <div className='absolute top-0 bg-black bg-opacity-50 w-full h-full flex justify-center items-center'>
        <div className='bg-white flex flex-col gap-4 px-8 py-4 rounded'>
            <MdClose fontSize={24} onClick={onClose}/>
            <span>برای ادامه فرایند دکمه تایید را بزنید</span>
            <Button title='تایید' color='pink' onClick={onConfirm}/>
        </div>
    </div>
  )
}

export default Confirm