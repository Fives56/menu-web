import { Component, ElementRef, ViewChild } from '@angular/core';
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
  order: string = 'name';
  direction: string = 'asc';
  limit: number = 10;
  offset: number = 0;
  count: number = 0;
  search: string ='';

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private categoryService: CategoryService) {}

  /**
   * Get the querys for the petition http
   * @returns String of the query
   */
  getQuerys() {
    this.search = this.searchInput.nativeElement.value;
    const params = new URLSearchParams();
    params.append('search', this.search);
    params.append('order', this.order);
    params.append('direction', this.direction);
    params.append('limit', this.limit!.toString());
    params.append('offset', this.offset!.toString());
  
    return '?' + params.toString();
  }

  update() {
    this.categoryService.get(this.getQuerys()).subscribe((data) => {
      this.categories = data.rows;
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.categoryService.get('?pagination=false').subscribe((data) => {
      this.categories = data.rows;
      this.loading = false
    });
  }
}
