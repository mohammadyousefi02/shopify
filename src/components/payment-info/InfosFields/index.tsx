import React from "react";
import Input from "../../Input";

interface Props {
    name:string
    setName:React.Dispatch<React.SetStateAction<string>>,
    province:string,
    setProvince:React.Dispatch<React.SetStateAction<string>>,
    city:string,
    setCity:React.Dispatch<React.SetStateAction<string>>,
    address:string,
    setAddress:React.Dispatch<React.SetStateAction<string>>,
    zipCode:string,
    setZipCode:React.Dispatch<React.SetStateAction<string>>,
    number:string,
    setNumber:React.Dispatch<React.SetStateAction<string>>
}

function InfosFields({name, setName, province, setProvince, city, setCity, address, setAddress, zipCode, setZipCode, number, setNumber}:Props) {
  return (
    <div className="flex flex-col w-full gap-2">
      <span>جزئیات پرداخت</span>
      <Input label="نام" value={name} onChange={e=>setName(e.target.value)}/>
      <Input label="استان" value={province} onChange={e=>setProvince(e.target.value)}/>
      <Input label="شهر" value={city} onChange={e=>setCity(e.target.value)}/>
      <Input label="آدرس" value={address} onChange={e=>setAddress(e.target.value)}/>
      <Input label="کد پستی" value={zipCode} onChange={e=>setZipCode(e.target.value)}/>
      <Input label="شماره تماس" value={number} onChange={e=>setNumber(e.target.value)}/>
    </div>
  );
}

export default InfosFields;
