import React, { useEffect, useState } from "react";
import { MdClose } from "../../../../icons";
import Button from "../../Button";
import Input from "../../Input";
import Select from "react-select";
import axios from "axios";
import { server } from "../../../../config/server";
import { Icategory } from "../../../../interfaces/categoryInterface";
import ProductDetailSection from "../ProductDetailSection";
import useAuthUserToken from "../../../../hooks/useAuthUserToken";
import { Iproduct } from "../../../../interfaces/productInterface";

export interface Isize {
  size: string;
  colors: string[];
  quantity: number;
}

interface Props {
  closeProductModal: () => void;
  product: Iproduct | undefined;
  setProduct: React.Dispatch<React.SetStateAction<Iproduct | undefined>>;
  getProducts: () => void;
}
function ProductModal({
  closeProductModal,
  product,
  setProduct,
  getProducts,
}: Props) {
  const [token] = useAuthUserToken();
  const [categoriesOptions, setCategoriesOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [category, setCategory] = useState(product ? product.category : "");
  const [sizeNumber, setSizeNumber] = useState(1);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [code, setCode] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState<Isize[]>([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCode(product.number.toString());
      setSizes(product.sizes);
      setSizeNumber(product.sizes.length);
      setCategory(product.category);
    }
  }, []);

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx!.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/webp", 0.3);
        resolve(dataURL);
      };
    });
  };

  function readFile(e: React.ChangeEvent<HTMLInputElement>) {
    const images: string[] = [];
    for (let i = 0; i < e.target.files!.length; i++) {
      convertToBase64(e.target.files![i])
        .then((base64) => {
          images.push(base64 as string);
          if (i === e.target.files!.length - 1) {
            setImages(images);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  useEffect(() => {
    axios
      .get(`${server}/api/categories`)
      .then((res) => {
        setCategoriesOptions(
          res.data.map((e: Icategory) => ({ value: e.name, label: e.name }))
        );
      })
      .catch((e) => console.log(e));
  }, []);

  const createProduct = async () => {
    const newP = { name, images, number: code, price, sizes, category };
    try {
      await axios.post(`${server}/api/products`, newP, {
        headers: {
          "x-auth-token": token,
        },
      });
      getProducts();
      closeProductModal();
    } catch (error) {
      console.log("e");
    }
  };

  const updateProduct = async () => {
    const newP: {
      name: string;
      number: string;
      price: string;
      sizes: Isize[];
      category: string;
      images?: string[];
    } = { name, number: code, price, sizes, category };
    if (images.length > 0) newP.images = images;
    try {
      await axios.put(`${server}/api/products/${product!._id}`, newP, {
        headers: {
          "x-auth-token": token,
        },
      });
      getProducts();
      closeProductModal();
      setProduct(undefined);
    } catch (error) {
      console.log("e");
    }
  };

  const closeModal = () => {
    closeProductModal();
    setProduct(undefined);
  };

  return (
    <div className="absolute top-0 bg-black bg-opacity-50 w-full min-h-full p-2 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-full sm:min-w-[500px] sm:max-w-[500px]">
        <div className="flex items-center justify-between mb-2 lg:mb-4">
          <span className="lg:text-base">{product ? "ویرایش کردن محصول" : "اضافه کردن محصول"}</span>
          <MdClose onClick={closeModal} className="lg:text-xl cursor-pointer"/>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            label="نام"
            rounded="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="قیمت"
            rounded="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="کد محصول"
            rounded="normal"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <div className="relative flex items-center justify-between pr-1">
              <span className="text-base">تصاویر</span>
              <input
                accept="image/*"
                onChange={readFile}
                multiple
                type="file"
                id="file"
                className="opacity-0 w-[1px] h-[1px] absolute"
              />
              <label
                htmlFor="file"
                className="bg-primary p-1 sm:p-2 rounded text-white cursor-pointer"
              >
                انتخاب تصاویر
              </label>
            </div>
            <h6>(برای انتخاب چند تصویر shift را نگه دارید)</h6>
          </div>
          <div>
            <label>
              دسته بندی
              <Select
                options={categoriesOptions}
                defaultValue={{label:category,value:category}}
                onChange={(value) => setCategory(value!.value)}
                className="cursor-pointer"
              />
            </label>
          </div>
          <div className="flex flex-col gap-2">
            {[...Array(sizeNumber)].map((e, i) => (
              <ProductDetailSection
                setSizeNumber={setSizeNumber}
                setSizes={setSizes}
                sizes={sizes}
                key={i}
                index={i}
              />
            ))}
            <span
              onClick={() => setSizeNumber((prev) => prev + 1)}
              className="text-primary cursor-pointer"
            >
              اضافه کردن سایز جدید
            </span>
          </div>
          <Button
            title="تایید"
            className="w-full"
            onClick={product ? updateProduct : createProduct}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
