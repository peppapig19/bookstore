import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../model/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  quantity: number[];

  constructor() { }

  ngOnInit(): void {
    this.quantity = Array.from(new Array(20), (_x, i) => i + 1);
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