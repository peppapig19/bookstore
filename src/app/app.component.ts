import { Component, OnInit } from '@angular/core';
import { Book } from './book/model/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bookstore';

  books: Book[];

  ngOnInit(): void {
    this.books = [
      new Book('HP1', 'Harry Potter and the Philosopher\'s Stone', 19.02, '../../../assets/hp1.jpg'),
      new Book('HP2', 'Harry Potter and the Chamber of Secrets', 19.02, '../../../assets/hp2.jpg'),
      new Book('HP3', 'Harry Potter and the Prisoner of Azkaban', 19.02, '../../../assets/hp3.jpg'),
      new Book('HP4', 'Harry Potter and the Goblet of Fire', 19.02, '../../../assets/hp4.jpg'),
      new Book('HP5', 'Harry Potter and the Order of the Phoenix', 19.02, '../../../assets/hp5.jpg')
    ];

    this.books[0].onSale = true;
    this.books[1].onSale = true;
    this.books[3].onSale = true;
  }

  trackBookByCode(_index: any, book: Book) {
    return book.code;
  }
}