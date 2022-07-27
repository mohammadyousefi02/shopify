import { useState,useEffect } from "react";

import { useDispatch,useSelector } from "react-redux";
import { setTotalPage } from "../redux/slices/pagination";


export default function usePagination(arr:any[],row:number,page:number){
    const dispatch = useDispatch();
    const [currentData,setCurrentData] = useState<any[]>([]);
   
    useEffect(()=>{
        dispatch(setTotalPage(Math.ceil(arr.length/row)))
        const startIndex = (page-1)*row;
        const endIndex = page*row;
        let data:any[] = []
        for(let i = startIndex;i<endIndex;i++){
            if(!arr[i])break;
            else data = [...data,arr[i]]
        }
        setCurrentData(data)
    },[arr,page,row])
    return currentData
}