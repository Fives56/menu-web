import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  categories!: Category[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.get('').subscribe((data) => {
      this.categories = data.rows;
    });
  }
}
