import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BookListComponent } from './book-list.component';
import { BookQuantity } from '../model/book-quantity';
import { BookCardComponent } from '../book-card/book-card.component';
import { Book } from '../model/book';

describe('BookListComponent', () => {
  describe('isolated unit tests', () => {
    it('should change quantity', () => {
      const bookListComponent = new BookListComponent();
      bookListComponent.ngOnInit();
      bookListComponent.onChangeQuantity(new BookQuantity(bookListComponent.books[0], 5));
      expect(bookListComponent.books[0].cart).toEqual(5);
    });
  });

  describe('integrated Angular tests', () => {
    let component: BookListComponent;
    let fixture: ComponentFixture<BookListComponent>;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [
          BookListComponent,
          BookCardComponent
        ]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render 5 book cards', () => {
      const bookCards: DebugElement[] = fixture.debugElement.queryAll(By.css('.book-card'));
      for (let i = 0; i < 5; i++) {
        assertBook(bookCards[i], component.books[i]);
      }
    });

    it('should handle increment correctly from card', () => {
      const bookCards: DebugElement[] = fixture.debugElement.queryAll(By.css('.book-card'));
      const incrementBtn: DebugElement = fixture.debugElement.query(By.css('#increment'));
      incrementBtn.triggerEventHandler('click');
      expect(component.books[0].cart).toEqual(1);
      assertBook(bookCards[0], component.books[0]);
    });

    function assertBook(card: DebugElement, book: Book) {
      if (book.onSale) expect(card.nativeElement).toHaveClass('available');
      else expect(card.nativeElement).not.toHaveClass('available');

      const nameDiv: HTMLDivElement = card.query(By.css('.name')).nativeElement;
      expect(nameDiv.textContent).toEqual(book.name);

      const priceDiv: HTMLDivElement = card.query(By.css('.price')).nativeElement;
      expect(priceDiv.textContent).toEqual('$ ' + book.price);

      const imageEl: HTMLImageElement = card.query(By.css('.image')).nativeElement;
      expect(imageEl.src).toContain(book.img);
      expect(imageEl.height).toBeGreaterThan(0);
    }
  });
});