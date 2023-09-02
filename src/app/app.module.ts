import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BookCardComponent } from './book/book-card/book-card.component';
import { BookListComponent } from './book/book-list/book-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BookCardComponent,
    BookListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }