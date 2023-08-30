export class Book {
    onSale: boolean;
    cart: number = 0;

    constructor(
        public name: string,
        public price: number,
        public img: string
    ) { }
}