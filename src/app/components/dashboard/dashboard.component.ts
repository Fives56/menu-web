import { Component, OnInit } from '@angular/core';
import { Food } from '../../models/food.model'
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  foods!: Food[];
  count!: number;

  constructor( private foodService: FoodService) { }

  ngOnInit() {
    this.foodService.getFoods().subscribe((data) => {
      this.foods = data.rows;
      this.count = data.count;
    });
  }
}
