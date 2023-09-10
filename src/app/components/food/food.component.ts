import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router'
import { Food } from 'src/app/models/food.model';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent {
  @Input() food!: Food;
  @Output() updateEmitter = new EventEmitter<any>();

  currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
  }
  
  update(){
    this.updateEmitter.emit();
  }
}
