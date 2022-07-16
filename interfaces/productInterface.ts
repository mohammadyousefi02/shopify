export interface Isize {
    size:string,
    colors:string[]
}

export interface Iproduct {
    _id:string,
    name:string,
    images:string[],
    price:string,
    sizes:Isize[],
    postedAt:number,
    number:number
}
