import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { CategoryService } from 'src/app/services/category.service';
import { FoodService } from 'src/app/services/food.service';
import { ModalEditCreateFoodComponent } from '../modal-edit-create-food/modal-edit-create-food.component';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit{

  @ViewChild('searchInput') searchInput!: ElementRef;

  foods?: Food[]
  category?: Category
  categories?: Category[]
  order: string = 'name';
  direction: string = 'asc';
  limit: number = 10;
  offset: number = 0;
  count: number = 0;
  search: string ='';
  loading: boolean = false;
  isAdmin: boolean = false;
  isAuth?: boolean
  constructor(
    public dialog: MatDialog,
    private foodService: FoodService,
    private categotyService: CategoryService,
    private usersService: UsersService) {}
  
  ngOnInit(): void {
    this.usersService.getUser().subscribe((data) => {
      this.isAdmin = data.isAdmin;
    });
    this.loading = true;
    this.foodService.get('').subscribe((data) => {
      this.foods = data.rows;
      this.count = data.count;
      this.loading = false;
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
    this.search = this.searchInput.nativeElement.value;
    const params = new URLSearchParams();
    params.append('search', this.search);
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
    this.loading = true;
    this.foodService.get(this.getQuerys()).subscribe((data) => {
      this.foods = data.rows;
      this.count = data.count;
      this.loading = false;
    });
  }

  openDialog(): void{
    let dialogRef;

    dialogRef = this.dialog.open(ModalEditCreateFoodComponent,{
      height: '415px',
      width: '350px',
      data: {}
    })
    
    dialogRef?.afterClosed()
    .pipe(
      switchMap((res) => {
        return this.foodService.add(res);
      })
    )
    .subscribe(() => {
      this.update();
    })
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
