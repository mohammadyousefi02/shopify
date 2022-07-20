import Head from 'next/head'
import MainLayout from '../src/layouts/MainLayout'
import { TiFilter } from "../icons"
import MySwiper from '../src/components/MySwiper'
import axios from 'axios'
import ProductCart from '../src/components/ProductCard'
import useGetUserId from '../hooks/useGetUserId'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, useEffect } from 'react'
import { server } from '../config/server'
import { Iproduct } from '../interfaces/productInterface'
import { setProducts, filterProducts, setFilterByNameValue } from "../redux/slices/productsReducer"
import { setCategories } from "../redux/slices/category"
import Header from '../src/components/Header/index'
import { Icategory } from '../interfaces/categoryInterface'
import CategoryCard from '../src/components/CategoryCard'

interface Props {
  products: Iproduct[],
  categories: Icategory[]
}

const Home = ({products, categories}:Props) => {
  const decodedToken = useGetUserId()

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setProducts({ products }))
    dispatch(setCategories(categories))
    dispatch(filterProducts())
  },[])
  
  const changeFilteredValueHandler = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterByNameValue(e.target.value))
    dispatch(filterProducts())
  }

  const { filteredProducts, filterByNameValue } = useSelector((store:any)=>store.products)

  const {user} = useSelector((store:any)=>store.user)
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <div className='pb-[90px]'>
        <Header inpValue={filterByNameValue} onChange={changeFilteredValueHandler}/>
          <div className='flex justify-center mt-4'>
            <div className='container mx-auto px-4 flex flex-col gap-4'>
              {categories.map(c=>(
                <CategoryCard key={c._id} id={c._id} title={c.name} products={c.products}/>
              ))}
            </div>
            {/* <div className='grid grid-cols-1 px-4 md:grid-cols-3 gap-4'>
              {filteredProducts?.map((p:Iproduct)=>(
                  <ProductCart images={p.images} price={p.price} title={p.name} _id={p._id} key={p._id}/>
              ))}
            </div> */}
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default Home

export async function getServerSideProps(){
  const res = await axios.get(`${server}/api/products`)
  const products:Iproduct[] = res.data
  const categoryRes = await axios.get(`${server}/api/categories`)
  const categories:Icategory[] = categoryRes.data
  return {
    props:{
      products,
      categories
    }
  }
}
