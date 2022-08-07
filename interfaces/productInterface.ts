export interface Isize {
    size:string,
    colors:string[],
    quantity:number
}

export interface Icomment {
    name:string,
    comment:string,
    date:number,
    user?:string,
    _id:string,
    star:string
}

export interface Iproduct {
    _id:string,
    name:string,
    images:string[],
    price:string,
    sizes:Isize[],
    postedAt:number,
    number:number,
    category:string,
    comments:Icomment[],
    star:string
}
