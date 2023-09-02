import { Book } from "./book";

export class BookQuantity {
    constructor(public book: Book,
        public quantity?: number) {
        if (this.quantity == null) this.quantity = book.cart;
    }

    incrementQuantity(quantityChange: number) {
        this.quantity! = Number(this.quantity) + quantityChange;
    }
}