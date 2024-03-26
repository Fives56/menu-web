import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { OffersComponent } from './components/offers/offers.component';
import { CategoryComponent } from './components/category/category.component';
import { FoodsComponent } from './components/foods/foods.component';
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CategoryComponent},
  { path: 'offers', component: OffersComponent },
  { path: 'foods', component: FoodsComponent},
  { path: "login", component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
