import { Iproduct } from './productInterface';

export interface IcartItem {
    color:string,
    size:string,
    quantity:number,
    product:Iproduct,
    _id:string
}

export interface Icart{
    items:IcartItem[]
}