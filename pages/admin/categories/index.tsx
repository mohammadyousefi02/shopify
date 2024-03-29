import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { server } from "../../../config/server";
import useAuthUserToken from "../../../hooks/useAuthUserToken";
import { Icategory } from "../../../interfaces/categoryInterface";
import CategoryModal from "../../../src/components/adminPanel/CategoryModal";
import Section from "../../../src/components/adminPanel/Section";
import AdminPanelLayout from "../../../src/layouts/AdminPanelLayout";
import { setPage } from "../../../redux/slices/pagination";
import { useDispatch } from "react-redux";
import Confirm from "../../../src/components/Confirm";
import Head from "next/head";

function Categories() {
  const dispatch = useDispatch();
  const [token] = useAuthUserToken();
  const [categories, setCategories] = useState<Icategory[]>();
  const [categoryId, setCategoryId] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [inpValue, setInpValue] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);

  useEffect(() => {
    dispatch(setPage(1));
  }, []);

  const getCategories = () =>
    axios
      .get(`${server}/api/categories`)
      .then((e) => setCategories(e.data))
      .catch((e) => console.log(e));
  useLayoutEffect(() => {
    getCategories();
  }, []);
  const ths = ["دسته بندی", "عملکردها"];
  const tbody = {
    data: categories!,
    by: ["name"],
  };
  const hideCategoryModal = () => {
    setShowCategoryModal(false);
    setInpValue("");
    setCategoryId("");
  };
  const showCategoryModalHandler = () => setShowCategoryModal(true);
  const onCreateNewCategory = () => {
    axios
      .post(
        `${server}/api/categories`,
        { name: inpValue },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((res) => {
        hideCategoryModal();
        getCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEditIcon = (id: string, name: string) => {
    setCategoryId(id);
    setInpValue(name);
    showCategoryModalHandler();
  };

  const onEditCategory = () => {
    axios
      .put(
        `${server}/api/categories/${categoryId}`,
        { name: inpValue },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((res) => {
        hideCategoryModal();
        getCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteIcon = (id: string) => {
    setCategoryId(id);
    setConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setConfirmModal(false);
    setCategoryId("");
  };

  const onDeleteCategory = () => {
    axios
      .delete(`${server}/api/categories/${categoryId}`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        getCategories();
      })
      .catch((err) => {
        console.log(err);
      });
    setConfirmModal(false);
    setCategoryId("");
  };
  return (
    <AdminPanelLayout>
      <Head>
        <title>دسته بندی ها</title>
      </Head>
      {categories && (
        <Section
          onAdd={showCategoryModalHandler}
          onDelete={onDeleteIcon}
          onEdit={onEditIcon}
          th={ths}
          tbody={tbody}
          title="دسته بندی ها"
        />
      )}
      {showCategoryModal && (
        <CategoryModal
          value={inpValue}
          setter={setInpValue}
          onClose={hideCategoryModal}
          onAdd={onCreateNewCategory}
          onEdit={onEditCategory}
          categoryId={categoryId}
        />
      )}
      {confirmModal && (
        <Confirm onClose={closeConfirmModal} onConfirm={onDeleteCategory} />
      )}
    </AdminPanelLayout>
  );
}

export default Categories;
