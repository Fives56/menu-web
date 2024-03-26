import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { CategoryService } from 'src/app/services/category.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  @Input() category!: Category;

  foods?: Food[];
  id?: number;
  order: string = 'name';
  direction: string = 'asc';
  limit: number = 2;
  offset: number = 0;
  count: number = 0;
  loading: boolean = false;

  constructor(
    private foodService: FoodService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  /**
   * Get the list of foods
   */
  getFoods() {
    this.loading = true;
    if (this.id && !this.category) {
      this.categoryService.getOne(this.id).pipe(
        switchMap((c) => {
          this.category = c;
          this.limit = 10;
          return this.foodService.get(this.getQuerys());
        })
      ).subscribe((data) => {
        this.foods = data.rows;
        this.count = data.count;
        this.loading = false;
      });
    } else {
      this.foodService.get(this.getQuerys()).subscribe((data) => {
        this.foods = data.rows;
        this.count = data.count;
        this.loading = false;
      });
    }
  }
  
  /**
   * Update the offset
   * @param offset offset recived of paginator
   */
  updateOffset(offset: number) {
    this.offset = offset;
    this.getFoods();
  }

  /**
   * Get the querys for the petition http
   * @returns String of the query
   */
  getQuerys() {
    // const search: string = this.searchInput.nativeElement.value;
    const params = new URLSearchParams();
    // params.append('search', search);
    params.append('order', this.order);
    params.append('direction', this.direction);
    params.append('limit', this.limit!.toString());
    params.append('offset', this.offset!.toString());
    params.append('category', this.category.id.toString());

    return '?' + params.toString();
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getFoods();
  }
}
