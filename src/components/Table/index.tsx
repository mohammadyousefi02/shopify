import React, { useEffect, useState } from 'react'

import { MdDelete, MdEdit } from "../../../icons"
import { useDispatch, useSelector } from 'react-redux'
import usePagination from '../../../hooks/usePagination'
import {setPage} from "../../../redux/slices/pagination";

interface Props {
    th:string[],
    tbody:{data:any[], by:string[]},
    onDelete?:(id: string) => void,
    onEdit?:(id: string, name: string) => void
}

function Table({th, tbody, onEdit, onDelete}:Props) {
    const { page } = useSelector((state:any) => state.pagination)
    const [data, paginationButtons] = usePagination(tbody.data, 10, page)
  return (
    <div>
        <table className='w-full'>
        <thead className="border-b border-gray">
            <tr>
                {th.map(t=>(
                    <th className='font-bold' key={t}>{t}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.map(d=>(
                <tr key={d._id}>
                    {tbody.by.map(b=>(
                        <td key={d._id + `-${b}`}>{b === "price" ? Number(d[b]).toLocaleString('fa') : d[b]}</td>
                    ))}
                    <td>
                        <div className='flex gap-1 text-base'>
                            <div className='bg-primary cursor-pointer p-1 rounded' onClick={()=>onEdit!(d._id, d[tbody.by[0]])}>
                                <MdEdit color='#fff'/>
                            </div>
                            <div className='bg-primary cursor-pointer p-1 rounded' onClick={()=>onDelete!(d._id)}>
                                <MdDelete color='#fff'/>
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

export default Table