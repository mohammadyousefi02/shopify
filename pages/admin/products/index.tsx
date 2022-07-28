import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { server } from '../../../config/server'
import useAuthUserToken from '../../../hooks/useAuthUserToken'
import { Icategory } from '../../../interfaces/categoryInterface'
import { setPage } from '../../../redux/slices/pagination'
import CategoryModal from '../../../src/components/adminPanel/CategoryModal'
import Section from '../../../src/components/adminPanel/Section'
import AdminPanelLayout from '../../../src/layouts/AdminPanelLayout'

function Products() {
  const dispatch = useDispatch()
  const [token] = useAuthUserToken()
  const [products, setProducts] = useState<Icategory[]>()
  const [productId , setProductId] = useState('')
  const [showProductModal, setShowProductModal] = useState(false)
  const [ inpValue, setInpValue ] = useState('')
  
  const getProducts = () => axios.get(`${server}/api/products`).then(e=>setProducts(e.data)).catch(e=>console.log(e))
  useLayoutEffect(() => {
    getProducts()
    dispatch(setPage(1))
  },[])
  const ths = ['نام', 'عملکردها']
  const tbody = {
    data:products!,
    by:'name'
  }
  const hideCategoryModal = () => {
    setShowProductModal(false);
    setInpValue('')
    setProductId('')
  }
  const showCategoryModalHandler = () => setShowProductModal(true);
  const onCreateNewCategory = () => {
    axios.post(`${server}/api/categories`, { name:inpValue }, {
      headers:{
        'x-auth-token':token
      }
    })
    .then(res => {
      hideCategoryModal()
      getProducts()
    }).catch(err => {
      console.log(err)
    }
    )
  }
  
  const onEditIcon = (id:string, name:string) => {
    setProductId(id)
    setInpValue(name)
    showCategoryModalHandler()
  }

  const onEditCategory = () => {
    axios.put(`${server}/api/categories/${productId}`, { name:inpValue }, {
      headers:{
        'x-auth-token':token
      }
    })
    .then(res => {
      hideCategoryModal()
      getProducts()
    }).catch(err => {
      console.log(err)
    }
    )
  }

  const onDeleteIcon = (id:string) => {
    axios.delete(`${server}/api/categories/${id}`, {
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
  }
  return (
    <div>
        <AdminPanelLayout>
            {products &&  <Section onAdd={showCategoryModalHandler} onDelete={onDeleteIcon} onEdit={onEditIcon} th={ths} tbody={tbody} title='محصولات'/> }
            {showProductModal && <CategoryModal value={inpValue} setter={setInpValue} onClose={hideCategoryModal} onAdd={onCreateNewCategory} onEdit={onEditCategory} categoryId={productId} /> }
        </AdminPanelLayout>
    </div>
  )
}

export default Products