import { Iproduct } from "./productInterface";

export interface Icategory {
    name: string,
    products: Iproduct[],
    _id:string
}