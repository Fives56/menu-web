import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { CategoryService } from 'src/app/services/category.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit{
  foods?: Food[]
  category?: Category

  constructor(private foodService: FoodService) {}
  
  ngOnInit(): void {
    this.foodService.get('').subscribe((data) => {
      this.foods = data.rows;
    });
  }

  

}
