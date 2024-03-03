import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { Offer } from 'src/app/models/offer.model';
import { CategoryService } from 'src/app/services/category.service';
import { FoodService } from 'src/app/services/food.service';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-modal-edit-create-offer',
  templateUrl: './modal-edit-create-offer.component.html',
  styleUrls: ['./modal-edit-create-offer.component.css'],
})
export class ModalEditCreateOfferComponent {
  id: number;
  name: string;
  price: number;
  categories: Category[] | any[];
  food: Food[] | any[];
  headerTitle: string = '';
  categoriesFoods!: any[];
  allCategories!: Category[] | any[];
  allFoods!: Food[] | any[];

  constructor(
    public dialogRef: MatDialogRef<ModalEditCreateOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Offer,
    private offerService: OfferService,
    private foodService: FoodService,
    private categoryService: CategoryService
  ) {
    this.id = data.id;
    this.name = data.name;
    this.price = data.price;
    this.categories = data.categories || [];
    this.food = data.food || [];
    this.headerTitle = data.id ? 'Editar oferta' : 'Crear oferta';
    categoryService.get('?order=id&pagination=false').subscribe((res) => {
      this.allCategories = res.rows;
    });
    foodService.get('?order=id&pagination=false').subscribe((res) => {
      this.allFoods = res.rows;
    });
  }

  ngOnInit(): void {
    this.categoriesFoods = this.offerService.order(this.data);
  }

  /**
   * change element in a food list when the select changes
   * @param event - event when the select changes
   * @param i - food index
   */
  onChangeFood(event: any, i: number) {
    this.food[i] = event.value;
  }

  /**
   * add a category to increase the size of the categories list
   */
  addCategory() {
    if (this.categoriesFoods) {
      this.categoriesFoods.push(this.allCategories[0]);
    } else {
      this.categoriesFoods = [];
      this.data.categories = [];
      this.data.categories.push(this.allCategories[0]);
      this.categoriesFoods.push(this.allCategories[0]);
    }
    this.categories.push(this.allCategories[0]);
    this.categoriesFoods = this.offerService.order(this.data);
  }

  /**
   * add a food to increase the size of the food list
   * @param i - food index
   */
  addFood(i: number) {
    this.categoriesFoods[i].foods.push(this.allFoods[0]);
    this.food.push(this.allFoods[0]);
  }

  /**
   * remove a food at the index of the food list
   * @param i - category index
   * @param j - food index
   */
  deleteFood(i: number, j: number) {
    this.categoriesFoods[i].foods.splice(j, 1);
    this.food.splice(j, 1);
  }

  /**
   * remove a category at the index of the categories list
   * @param i - category index
   */
  deleteCategory(i: number) {
    this.categoriesFoods.splice(i, 1);
    this.categories.splice(i, 1);
  }

  /**
   * close dialog
   */
  onClickEdit() {
    this.dialogRef.close({
      id: this.id,
      name: this.name,
      price: this.price,
      categories: this.getCategoriesId(),
      foods: this.getFoodsId(),
    });
  }

  /**
   * Get the ids of categories
   * @returns An array of ids of categories
   */
  getCategoriesId() {
    let categoriesId = [];
    for (const c of this.categories) {
      categoriesId.push(c.id);
    }
    return categoriesId;
  }

  /**
   * Get the ids of foods
   * @returns An array of ids of foods
   */
  getFoodsId() {
    let foodsId = [];
    for (const f of this.food) {
      foodsId.push(f.id);
    }
    return foodsId;
  }
}
