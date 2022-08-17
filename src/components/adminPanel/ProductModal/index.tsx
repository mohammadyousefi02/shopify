import React, { useEffect, useState } from 'react'
import { MdClose } from "../../../../icons"
import Button from '../../Button'
import Input from '../../Input'
import Select  from "react-select"
import axios from 'axios'
import { server } from '../../../../config/server'
import { Icategory } from '../../../../interfaces/categoryInterface'
import ProductDetailSection from '../ProductDetailSection'
import useAuthUserToken from '../../../../hooks/useAuthUserToken'

interface Props {
    closeProductModal:()=>void
}

export interface Isize {
    size:string
    colors:string[],
    quantity:number
}

function ProductModal({closeProductModal}:Props) {
    const [ token ] = useAuthUserToken()
    const [categoriesOptions, setCategoriesOptions] = useState<{value:string,label:string}[]>([])
    const [category, setCategory] = useState("")
    const [sizeNumber, setSizeNumber] = useState(1)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [code, setCode] = useState('')
    const [images, setImages] = useState<string[]>([])
    const [sizes, setSizes] = useState<Isize[]>([])

    const convertToBase64 = (file:File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = (e:any) => {
                resolve(e.target.result)
            }
        })
    }

    function readFile(e: React.ChangeEvent<HTMLInputElement>) {
        const images:string[] = []
        for(let i = 0; i < e.target.files!.length; i++) {
            const url = URL.createObjectURL(e.target.files![i])
            images.push(url)
                if(i === e.target.files!.length - 1) {
                    setImages(images)
                }
        //     convertToBase64(e.target.files![i]).then((base64) => {
        //         images.push({name:e.target.files![i].name, image:base64 as string})
        //         if(i === e.target.files!.length - 1) {
        //             setImages(images)
        //         }
        //    }).catch(err => console.log(err))
        //    continue
      }
    }
    useEffect(()=>{
        axios.get(`${server}/api/categories`).then(res=>{
            setCategoriesOptions(res.data.map((e:Icategory)=>({value:e.name, label:e.name})))
        }).catch(e=>console.log(e))
    },[])

    const createProduct = async() => {
        const newP = {name, images,number:code,price,sizes,category}
        try {
            await axios.post(`${server}/api/products`,newP,{
                headers:{
                    'x-auth-token' : token
                }
            })
            closeProductModal()
        } catch (error) {
            console.log("e")
        }
    }

  return (
    <div className='absolute top-0 bg-black bg-opacity-50 w-full min-h-full p-2'>
        <div className='bg-white rounded-lg p-2'>
            <div className='flex items-center justify-between mb-2'>
                <span>اضافه کردن محصول</span>
                <MdClose onClick={closeProductModal}/>
            </div>
            <div className='flex flex-col gap-4'>
                <Input label="نام" rounded='normal' value={name} onChange={e=>setName(e.target.value)}/>
                <Input label="قیمت" rounded='normal' value={price} onChange={e=>setPrice(e.target.value)}/>
                <Input label="کد محصول" rounded='normal' value={code} onChange={e=>setCode(e.target.value)}/>
                <div className='flex flex-col gap-2'>
                   <div className='relative flex items-center justify-between'>
                   <span>تصاویر</span>
                    <input accept='image/*' onChange={readFile} multiple type="file" id='file' className='opacity-0 w-[1px] h-[1px] absolute' />
                    <label htmlFor="file" className='bg-primary p-1 rounded text-white'>انتخاب تصاویر</label>
                   </div>
                    <h6>(برای انتخاب چند تصویر shift را نگه دارید)</h6>
                </div>
            <div>
                <label>دسته بندی
                    <Select options={categoriesOptions} onChange={value=>setCategory(value!.value)}/>
                </label>
            </div>
            <div className='flex flex-col gap-2'>
                {[...Array(sizeNumber)].map((e,i)=>(
                    <ProductDetailSection setSizes={setSizes} sizes={sizes} key={i} index={i}/>
                ))}
                <span onClick={()=>setSizeNumber(prev=>prev+1)} className='text-primary'>اضافه کردن سایز جدید</span>
            </div>
            <Button title='تایید' className='w-full' onClick={createProduct}/>
            </div>
            <img src={images[0]} alt="" />
        </div>
    </div>
  )
}

export default ProductModal