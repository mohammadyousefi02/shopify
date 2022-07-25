import React from 'react'
import Button from '../../Button'
import Input from '../../Input'

interface Props {
    onAdd: React.MouseEventHandler,
    onEdit: React.MouseEventHandler,
    onClose:React.MouseEventHandler,
    value:string,
    setter:React.Dispatch<React.SetStateAction<string>>,
    categoryId:string
}

function CategoryModal({onAdd, onEdit, onClose, value, setter, categoryId}:Props) {
  return (
    <div className='h-full w-full absolute top-0 bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='bg-white p-3 w-[300px] rounded-lg'>
            <Input label="عنوان" rounded='normal' value={value} onChange={(e)=>setter(e.target.value)} />
            <div className='mt-4 flex justify-between'>
                <Button title='بستن' color='pink' onClick={onClose}/>
                <Button title={categoryId ? "ویرایش کردن" : "اضافه کردن"} onClick={categoryId ? onEdit : onAdd}/>
            </div>
        </div>
    </div>
  )
}

export default CategoryModal