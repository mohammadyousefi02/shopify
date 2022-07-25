import React from 'react'
import Button from '../../Button'
import Table from '../../Table'

interface Props {
    title:string,
    th:string[],
    tbody:{data:any[], by:string},
    onDelete?:(id: string) => void,
    onEdit?:(id: string, name: string) => void,
    onAdd?:React.MouseEventHandler
}

function Section({title, th, tbody, onDelete, onEdit, onAdd}:Props) {
  return (
    <div className='container mx-auto'>
        <div className='bg-white mt-4 px-4 rounded-lg'>
            <div className='flex justify-between items-center border-b border-gray py-2'>
                <h1>{title}</h1>
                <Button onClick={onAdd} title='افزودن' color='pink' rounded='normal' className='px-12'/>
            </div>
            <Table onDelete={onDelete} onEdit={onEdit} tbody={tbody} th={th} />
        </div>
    </div>
  )
}

export default Section