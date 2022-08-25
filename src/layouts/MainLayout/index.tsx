import React, { useEffect, useState } from "react";
import useGetUserData from "../../../hooks/useGetUserData";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomMenu from "../../components/BottomMenu";
import SideBarMenu from "../../components/SideBarMenu";
import convertNumToPer from "../../../utils/convertNumToPer";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../redux/slices/productsReducer";
import { setCategories } from "../../../redux/slices/category";
import axios from "axios";
import { server } from "../../../config/server";

interface Props {
  children?: React.ReactNode;
}

function MainLayout({ children }: Props) {
  convertNumToPer();
  const [showSideBar, setShowSideBar] = useState(false);
  useGetUserData();
  
  const dispatch = useDispatch();
  const getDatas = async () => {
    const res = await axios.get(`${server}/api/products`);
    dispatch(setProducts({ products: res.data }));
    const categoryRes = await axios.get(`${server}/api/categories`);
    dispatch(setCategories(categoryRes.data));
  };
  useEffect(() => {
    getDatas();
  }, []);
  return (
    <>
      <div>
        <ToastContainer />
        <Header />
        <main>{children}</main>
        <Footer />
        <BottomMenu setShowSideBar={setShowSideBar} />
        {showSideBar && <SideBarMenu setShowSideBar={setShowSideBar} />}
      </div>
    </>
  );
}

export default MainLayout;
