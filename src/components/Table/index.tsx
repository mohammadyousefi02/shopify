import React from 'react'

import { MdDelete, MdEdit } from "../../../icons"

interface Props {
    th:string[],
    tbody:{data:any[], by:string},
    onDelete?:(id: string) => void,
    onEdit?:(id: string, name: string) => void
}

function Table({th, tbody, onEdit, onDelete}:Props) {
  return (
    <table className='w-full'>
        <thead className="border-b border-gray">
            <tr>
                {th.map(t=>(
                    <th className='font-bold' key={t}>{t}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {tbody.data.map(d=>(
                <tr key={d[tbody.by]}>
                    <td>{d[tbody.by]}</td>
                    <td>
                        <div className='flex gap-1 text-base'>
                            <div className='bg-primary p-1 rounded' onClick={()=>onEdit!(d._id, d[tbody.by])}>
                                <MdEdit color='#fff'/>
                            </div>
                            <div className='bg-primary p-1 rounded' onClick={()=>onDelete!(d._id)}>
                                <MdDelete color='#fff'/>
                            </div>
                        </div>
                    </td>
            </tr>
            ))}
        </tbody>
    </table>
  )
}

export default Table