import { Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../model/book';
import { BookQuantity } from '../model/book-quantity';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  @Output() changeQuantity: EventEmitter<BookQuantity> = new EventEmitter<BookQuantity>();
  quantityOptions: number[];

  constructor() { }

  ngOnInit(): void {
    this.quantityOptions = Array.from(new Array(20), (_x, i) => i + 1);
  }

  onIncrementQuantity(quantityChange: number) {
    const bq = new BookQuantity(this.book);
    bq.incrementQuantity(quantityChange);
    this.changeQuantity.emit(bq);
  }

  onSelectQuantity(quantity: number) {
    this.changeQuantity.emit(new BookQuantity(this.book, quantity));
  }
}