import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  @Input() category!: Category;

  foods?: Food[];

  constructor(private foodService: FoodService) {}

  getFoods() {
    this.foodService
      .get(`?limit=2&category=${this.category.id}`)
      .subscribe((data) => {
        this.foods = data.rows;
      });
  }

  ngOnInit(): void {
    this.getFoods();
  }
}
