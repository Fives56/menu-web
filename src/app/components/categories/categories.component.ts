import { Component } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  categories!: Category[];
  loading: boolean = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loading = true;
    this.categoryService.get('?pagination=false').subscribe((data) => {
      this.categories = data.rows;
      this.loading = false
    });
  }
}
