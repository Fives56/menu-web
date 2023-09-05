import { Component, OnInit } from '@angular/core';
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
  categories?: Category[]
  order: string = 'name';
  direction: string = 'asc';
  limit: number = 10;
  offset: number = 0;
  count: number = 0;

  constructor(
    private foodService: FoodService,
    private categotyService: CategoryService) {}
  
  ngOnInit(): void {
    this.foodService.get('').subscribe((data) => {
      this.foods = data.rows;
      this.count = data.count;
    });
    this.categotyService.get('?pagination=false').subscribe((data) => {
      this.categories = data.rows;
    })
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
    if(this.category){
      params.append('category', this.category.id.toString());
    }
    return '?' + params.toString();
  }

  /**
   * Update the list of foods
   */
  update() {
    this.foodService.get(this.getQuerys()).subscribe((data) => {
      this.foods = data.rows;
      this.count = data.count;
    });
  }

  /**
   * Get the foods of the selected category
   * @param category Category selected
   */
  onSelect(category?: Category): void {
    this.category = category;
    this.update()
  }

  /**
   * Update the offset
   * @param offset offset recived of paginator
   */
  updateOffset(offset: number) {
    this.offset = offset;
    this.update();
  }
}
