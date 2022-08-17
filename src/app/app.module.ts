import { BaristamaticComponent } from './components/baristamatic/baristamatic.component';
import { baristamaticReducer } from './components/baristamatic/store/baristamatic.reducer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BaristamaticComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    StoreModule.forRoot({ baristamatic: baristamaticReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
