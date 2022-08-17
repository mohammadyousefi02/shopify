import React, { useEffect, useState } from 'react'
import Input from '../../Input'
import { Isize } from '../ProductModal'


interface Props {
  setSizes:React.Dispatch<React.SetStateAction<Isize[]>>,
  sizes:Isize[],
  index:number
}

function ProductDetailSection({setSizes,sizes,index}:Props) {
  const [size, setSize] = useState('')
  const [colors, setColors] = useState<string[]>([])
  const [color, setColor] = useState('')
  const [quantity, setQuantity] = useState(1)

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
  return (
    <div className='flex flex-col gap-2'>
        <Input rounded='normal' label="سایز" value={size} onChange={(e)=>setSize(e.target.value)}/>
        <Input rounded='normal' label="رنگ ها(با ، جدا کنید)" value={color} onChange={changeColorInpHandler}/>
        <Input rounded='normal' label="تعداد" value={quantity} onChange={(e)=>setQuantity(+e.target.value)}/>
    </div>
  )
}

export default ProductDetailSection