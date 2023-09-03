import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodComponent } from './components/food/food.component';
import { CategoryComponent } from './components/category/category.component';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { OffersComponent } from './components/offers/offers.component';
import { OfferComponent } from './components/offer/offer.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FoodsComponent } from './components/foods/foods.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    CategoryComponent,
    MenuComponent,
    OffersComponent,
    OfferComponent,
    CategoriesComponent,
    FoodsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
