import React, { useEffect, useState } from 'react'

import { MdDelete, MdEdit } from "../../../icons"
import { useDispatch, useSelector } from 'react-redux'
import usePagination from '../../../hooks/usePagination'
import {setPage} from "../../../redux/slices/pagination";

interface Props {
    th:string[],
    tbody:{data:any[], by:string},
    onDelete?:(id: string) => void,
    onEdit?:(id: string, name: string) => void
}

function Table({th, tbody, onEdit, onDelete}:Props) {
    const dispatch = useDispatch()
    const { totalPage, page } = useSelector((state:any) => state.pagination)
    const data = usePagination(tbody.data, 5, page)
    const paginationButtons = []
    for (let i = 1; i <= totalPage; i++) {
        const button = (
            <span onClick={()=>dispatch(setPage(i))} className={`bg-primary cursor-pointer pt-1 px-2 flex items-center justify-center rounded text-white ${page === i ? "bg-[#cc2b3e]" : ""}`}>{i}</span>
        )
        paginationButtons.push(button)
    }
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
        <div className='flex justify-center items-center gap-1 mt-4 py-2'>
              {[paginationButtons]}
        </div>
    </div>
  )
}

export default Table