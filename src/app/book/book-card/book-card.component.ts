import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  book: Book;

  constructor() { }

  ngOnInit(): void {
    this.book = new Book('Harry Potter and the Order of the Phoenix', 19.02, '');
    this.book.onSale = true;
  }

  addToCart(event: any) {
    console.log(event);
    this.book.cart++;
  }

  removeFromCart(event: any) {
    console.log(event);
    this.book.cart--;
  }
}