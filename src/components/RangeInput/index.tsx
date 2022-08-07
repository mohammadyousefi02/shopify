import React from 'react'
import Input from '../Input'

interface Props {
  minValue:string,
  maxValue:string,
  max:number,
  onMinChange:(value:string) => void,
  onMaxChange:(value:string) => void,
}

function RangeInput({minValue, maxValue, max, onMinChange, onMaxChange}:Props) {
  return (
    <div className='w-full flex flex-col gap-2 text-[#424750]'>
        <div className='flex items-center gap-1'>
          <span className='font-bold'>از</span>
          <Input value={Number(minValue).toLocaleString('fa')} onChange={(e)=>onMinChange(e.target.value)} className="bg-transparent text-2xl  text-[#424750] font-bold border-b border-gray border-opacity-50 rounded-[0] text-left"/>
          <span className='font-bold'>تومان</span>
        </div>
        <div className='flex items-center gap-1'>
          <span className='font-bold'>تا</span>
          <Input value={Number(maxValue).toLocaleString('fa')} onChange={(e)=>onMaxChange(e.target.value)} className="bg-transparent text-2xl  text-[#424750] font-bold border-b border-gray border-opacity-50 rounded-[0] text-left"/>
          <span className='font-bold'>تومان</span>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col'>
            <span>ارزان ترین</span>
            <input min={0} max={max} value={minValue} onChange={(e)=>onMinChange(e.target.value)} type='range'/>
          </div>
          <div className='flex flex-col'>
            <span>گران ترین</span>
            <input min={0} max={max} value={maxValue} onChange={(e)=>onMaxChange(e.target.value)} type='range'/>
          </div>
        </div>
    </div>
  )
}

export default RangeInput