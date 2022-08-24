import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { server } from '../../../config/server'
import useAuthUserToken from '../../../hooks/useAuthUserToken'
import { Iproduct } from '../../../interfaces/productInterface'
import { setPage } from '../../../redux/slices/pagination'
import ProductModal from '../../../src/components/adminPanel/ProductModal'
import Section from '../../../src/components/adminPanel/Section'
import Confirm from '../../../src/components/Confirm'
import AdminPanelLayout from '../../../src/layouts/AdminPanelLayout'

function Products() {
  const dispatch = useDispatch()
  const [token] = useAuthUserToken()
  const [products, setProducts] = useState<Iproduct[]>()
  const [productId , setProductId] = useState('')
  const [product, setProduct] = useState<Iproduct>()
  const [showProductModal, setShowProductModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  
  const getProducts = () => axios.get(`${server}/api/products`).then(e=>setProducts(e.data)).catch(e=>console.log(e))

  useLayoutEffect(() => {
    getProducts()
    dispatch(setPage(1))
  },[])

  const ths = ['نام', 'دسته بندی', 'قیمت', 'عملکردها']
  const tbody = {
    data:products!,
    by:['name', 'category', 'price']
  }
  const closeProductModal = () => {
    setShowProductModal(false);
    setProductId('')
  }
  const showProductModalHandler = () => setShowProductModal(true);
  
  const onEditIcon = (id:string, name:string) => {
    const product = products!.find(e=>e._id === id)
    setProduct(product)
    showProductModalHandler()
  }

  const onDeleteIcon = (id:string) => {
    setProductId(id)
    setConfirmModal(true)
  }

  const closeConfirmModal = () => {
    setConfirmModal(false)
    setProductId('')
  }

  const onDelete = () => {
    axios.delete(`${server}/api/products/${productId}`, {
      headers:{
        'x-auth-token':token
      }
    })
    .then(res => {
      getProducts()
    }).catch(err => {
      console.log(err)
    }
    )
    setConfirmModal(false)
    setProductId('')
  }
  return (
        <AdminPanelLayout>
            {products &&  <Section onAdd={showProductModalHandler} onDelete={onDeleteIcon} onEdit={onEditIcon} th={ths} tbody={tbody} title='محصولات'/> }
            {showProductModal && <ProductModal getProducts={getProducts} setProduct={setProduct} product={product} closeProductModal={closeProductModal}/>}
            {confirmModal && <Confirm onClose={closeConfirmModal} onConfirm={onDelete}/>}
        </AdminPanelLayout>
  )
}

export default Products