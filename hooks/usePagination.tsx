import { useState,useEffect } from "react";

import { useDispatch,useSelector } from "react-redux";
import { setPage, setTotalPage } from "../redux/slices/pagination";


export default function usePagination(arr:any[],row:number,page:number){
    const dispatch = useDispatch();
    const [currentData,setCurrentData] = useState<any[]>([]);
    const [paginationButtons, setPaginationButtons] = useState<any[]>([]);
    
   
    useEffect(()=>{
        dispatch(setTotalPage(Math.ceil(arr.length/row)))
        const startIndex = (page-1)*row;
        const endIndex = page*row;
        let data:any[] = []
        for(let i = startIndex;i<endIndex;i++){
            if(!arr[i])break;
            else data = [...data,arr[i]]
        }
        const paginationButtons:any[] = []
        for (let i = 1; i <= Math.ceil(arr.length/row); i++) {
            const button = (
                <span onClick={()=>dispatch(setPage(i))} className={`bg-primary cursor-pointer pt-1 px-2 flex items-center justify-center rounded text-white ${page === i ? "bg-[#cc2b3e]" : ""}`}>{i}</span>
            )
            paginationButtons.push(button)
        }
        setCurrentData(data)
        setPaginationButtons(paginationButtons)
    },[arr,page,row])
    return [currentData,paginationButtons]
}