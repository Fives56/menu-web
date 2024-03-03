import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodComponent } from './components/food/food.component';
import { CategoryComponent } from './components/category/category.component';
import { MenuComponent } from './components/menu/menu.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OffersComponent } from './components/offers/offers.component';
import { OfferComponent } from './components/offer/offer.component'; 
import { CategoriesComponent } from './components/categories/categories.component';
import { FoodsComponent } from './components/foods/foods.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { ModalEditCreateFoodComponent } from './components/modal-edit-create-food/modal-edit-create-food.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { LoginComponent } from "./components/login/login.component";
import { CookieService } from "ngx-cookie-service";

@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    CategoryComponent,
    MenuComponent,
    OffersComponent,
    OfferComponent,
    CategoriesComponent,
    FoodsComponent,
    PaginatorComponent,
    ActionButtonsComponent,
    ModalEditCreateFoodComponent,
    ModalConfirmComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSelectModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
