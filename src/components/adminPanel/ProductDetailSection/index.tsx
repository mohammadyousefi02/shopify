import React, { useEffect, useState } from 'react'
import Input from '../../Input'
import { Isize } from '../ProductModal'


interface Props {
  setSizes:React.Dispatch<React.SetStateAction<Isize[]>>,
  sizes:Isize[],
  index:number,
  setSizeNumber:React.Dispatch<React.SetStateAction<number>>,
}

function ProductDetailSection({setSizes,sizes,index, setSizeNumber}:Props) {
  const [size, setSize] = useState('')
  const [colors, setColors] = useState<string[]>([])
  const [color, setColor] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if(sizes[index]){
      setSize(sizes[index].size)
      setColors(sizes[index].colors)
      setColor(sizes[index].colors.join('،'))
      setQuantity(sizes[index].quantity)
    }
  },[sizes])

  useEffect(()=>{
    if(size && color && quantity){
      const sizesC:Isize[] = [...sizes]
      sizesC[index] = {size,colors,quantity}
      setSizes(sizesC)
    }
  },[size, color, quantity])

  const changeColorInpHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
    const colors = e.target.value.split('،')
    setColors(colors)
  }

  const onDelete = () => {
    const sizesC:Isize[] = [...sizes]
    sizesC.splice(index,1)
    setSizes(sizesC)
    setSizeNumber(prev=>prev-1)
  }
  return (
    <div className={`flex flex-col gap-3 ${index>0 && "border-t pt-2 mt-2"}`}>
        <Input rounded='normal' label="سایز" value={size} onChange={(e)=>setSize(e.target.value)}/>
        <Input rounded='normal' label="رنگ ها(با ، جدا کنید)" value={color} onChange={changeColorInpHandler}/>
        <Input rounded='normal' label="تعداد" value={quantity} onChange={(e)=>setQuantity(+e.target.value)}/>
        {index > 0 && <span className='text-red-700 font-bold cursor-pointer' onClick={onDelete}>حذف کردن</span>}
    </div>
  )
}

export default ProductDetailSection