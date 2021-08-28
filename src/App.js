import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import ProductPage from './components/ProductsPage/ProductPage'
import HistoryPage from './components/HistoryPage/HistoryPage'
import CartPage from './components/CartPage/CartPage'
import SignInPage from './components/SignInPage/SignInPage'
import RegisterPage from './components/RegisterPage.js/RegisterPage'
import ProductDetailePage from './components/ProductDetailPage/ProductDetailPage'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsAction } from './actions/product.actions'
import { getUserInformation, keepUserLogin } from './actions/auth.actions'
import PageNotFound from './components/PageNotFound/PageNotFound'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderDetailPage from './components/OrderDetailPage.js/OrderDetailPage'
import HocAdmin from './HOC/HocAdmin'
import CreateCatagory from './components/CreateCatagory/CreateCatagory'
import CreateProducts from './components/CreateProducts.js/CreateProducts'
import { getAllCatagories } from './actions/catagories.actions'
const App = () => {
  const token = localStorage.getItem('token')
  //set time out for refresh token...
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    //product detail page data...
    dispatch(getAllProductsAction())
    dispatch(getAllCatagories())
    //hitorypage data...
  }, [])
  //on auth.authenticate change...
  useEffect(() => {
    if (!auth.authenticate)
      dispatch(keepUserLogin())
  }, [auth.authenticate])
  //user information..
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getUserInformation())
    }
  }, [auth.authenticate])
  //
  //toasts...
  const notify = () => {
    toast.dark('👍 ADDED TO CART!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  //
  // const [settingitme, setsettingitme] = useState()
  // useEffect(() => {
  //   if (auth.authenticate) {
  //     let time = setTimeout(() => {
  //       dispatch(keepUserLogin())
  //       setsettingitme(time);
  //     }, 10 * 60 * 1000) 
  //     return () => {
  //       clearTimeout(time)
  //     }
  //   }
  // }, [settingitme])
  //get all catagories....
  return (
    <>
      <BrowserRouter>
        {/* this toastcontainer for whole app toast... */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
        <Routes>
          <Route path='/' element={<ProductPage notify={notify} />} />
          <Route path='/products' element={<ProductPage notify={notify} />} />
          <Route path='/history' element={< HistoryPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/product/:id' element={<ProductDetailePage notify={notify} />} />
          <Route path={`/orderdetialpage/:id`} element={<OrderDetailPage />} />
          <HocAdmin path='/createcatagory' element={<CreateCatagory />} />
          <HocAdmin path='/createproduct' element={<CreateProducts />} />
          <HocAdmin path={`/createproduct/:id`} element={<CreateProducts />} />
          <Route path='*' element={<PageNotFound />} />
          )
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
