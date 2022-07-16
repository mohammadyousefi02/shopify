import { Icart } from './cartInterface';
import { Iproduct } from "./productInterface"
import { Iorder } from "./orderInterface"


export interface Iuser {
    username:string,
    email:string,
    password:string,
    _id:string,
    cart:Icart,
    saved:{
        items:[{product:Iproduct}]
    },
    orders:Iorder[],
    isAdmin?:boolean
}