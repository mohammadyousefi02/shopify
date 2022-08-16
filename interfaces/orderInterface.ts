import { Icart } from "./cartInterface"

export interface Icustomer {
    _id:string,
    user:string,
    name:string,
    province:string,
    city:string,
    address:string,
    zipcode:number,
    number:number,
}

export interface Iorder extends Icart {
    _id:string,
    createdAt:number,
    total:number,
}


export interface Iorders {
    _id:string,
    customer:Icustomer,
    order:Iorder,
    delivered:boolean,
    deliveredAt:number,
}