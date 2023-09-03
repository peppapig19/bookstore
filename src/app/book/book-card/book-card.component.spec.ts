import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BookCardComponent } from './book-card.component';
import { Book } from '../model/book';
import { BookQuantity } from '../model/book-quantity';

describe('BookCardComponent', () => {
  describe('Angular-aware unit tests', () => {
    let component: BookCardComponent;
    let fixture: ComponentFixture<BookCardComponent>;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [BookCardComponent]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookCardComponent);
      component = fixture.componentInstance;
      component.book = new Book('HP2', 'Harry Potter and the Chamber of Secrets', 19.02, 'hp2.jpg');
      component.book.onSale = true;
      fixture.detectChanges();
    });

    it('should render book data', () => {
      const bookCardDiv: HTMLDivElement = fixture.debugElement.query(By.css('.book-card')).nativeElement;
      expect(bookCardDiv).toHaveClass('available');

      const nameDiv: HTMLDivElement = fixture.debugElement.query(By.css('.name')).nativeElement;
      expect(nameDiv.textContent).toEqual('Harry Potter and the Chamber of Secrets');

      const priceDiv: HTMLDivElement = fixture.debugElement.query(By.css('.price')).nativeElement;
      expect(priceDiv.textContent).toEqual('$ 19.02');

      const imageEl: HTMLImageElement = fixture.debugElement.query(By.css('.image')).nativeElement;
      expect(imageEl.src).toContain('hp2.jpg');
      expect(imageEl.height).toBeGreaterThan(0);

      const decrementBtn: DebugElement = fixture.debugElement.query(By.css('#decrement'));
      expect(decrementBtn).toBeNull();
      const incrementBtn: DebugElement = fixture.debugElement.query(By.css('#increment'));
      expect(incrementBtn).toBeDefined();

      fixture.whenStable().then(() => {
        const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
        expect(selectEl.options.length).toEqual(component.quantityOptions.length + 1);
        expect(selectEl.options[selectEl.selectedIndex].text).toEqual('-');
      });
    });

    it('should trigger event emitter on quantity increment', () => {
      const incrementBtn: DebugElement = fixture.debugElement.query(By.css('#increment'));
      let bq: BookQuantity;
      component.changeQuantity.subscribe((bookQuantity: BookQuantity) => bq = bookQuantity);
      expect(bq!).toBeUndefined();
      incrementBtn.triggerEventHandler('click');
      expect(bq!).toEqual(new BookQuantity(component.book, component.book.cart + 1));
    });

    it('should render decrement button and trigger event emitter on quantity decrement', () => {
      component.book.cart++;
      fixture.componentRef.setInput('book', component.book);
      fixture.detectChanges();
      const decrementBtn: DebugElement = fixture.debugElement.query(By.css('#decrement'));
      expect(decrementBtn).toBeDefined();
      let bq: BookQuantity;
      component.changeQuantity.subscribe((bookQuantity: BookQuantity) => bq = bookQuantity);
      expect(bq!).toBeUndefined();
      decrementBtn.triggerEventHandler('click');
      expect(bq!).toEqual(new BookQuantity(component.book, component.book.cart - 1));
    });

    it('should trigger event emitter on quantity select', () => {
      const selectEl: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
      let bq: BookQuantity;
      component.changeQuantity.subscribe((bookQuantity: BookQuantity) => bq = bookQuantity);
      expect(bq!).toBeUndefined();
      selectEl.selectedIndex = 5;
      selectEl.dispatchEvent(new Event('change'));
      expect(bq!).toEqual(new BookQuantity(component.book, 5));
    });
  });
});