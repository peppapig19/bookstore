import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { BookQuantity } from '../model/book-quantity';

@Component({
  selector: 'app-book-list',
  template: `
  <div class="books-container">
    <app-book-card *ngFor="let book of books; index as i; trackBy: trackBookByCode"
    [book]="book" (changeQuantity)="onChangeQuantity($event)"></app-book-card>
  </div>
  `,
  styles: [`
  .books-container {
    display: grid;
    gap: 10px;
  }
  
  @media (min-width: 768px) {
    .books-container {
        grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1200px) {
    .books-container {
        grid-template-columns: repeat(3, 1fr);
    }
  }
  `]
})
export class BookListComponent implements OnInit {
  books: Book[];

  ngOnInit(): void {
    this.books = [
      new Book('HP1', 'Harry Potter and the Philosopher\'s Stone', 19.02, 'hp1.jpg'),
      new Book('HP2', 'Harry Potter and the Chamber of Secrets', 19.02, 'hp2.jpg'),
      new Book('HP3', 'Harry Potter and the Prisoner of Azkaban', 19.02, 'hp3.jpg'),
      new Book('HP4', 'Harry Potter and the Goblet of Fire', 19.02, 'hp4.jpg'),
      new Book('HP5', 'Harry Potter and the Order of the Phoenix', 19.02, 'hp5.jpg')
    ];
    this.books[0].onSale = true;
    this.books[1].onSale = true;
    this.books[3].onSale = true;
  }

  trackBookByCode(_index: number, book: Book) {
    return book.code;
  }

  onChangeQuantity(event: BookQuantity) {
    const book: Book = this.books.find(b => {
      return b.code === event.book.code
    })!;
    book.cart = event.quantity!;
  }
}