import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { Category } from 'src/app/models/category.model';
import { Food } from 'src/app/models/food.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-modal-edit-create-food',
  templateUrl: './modal-edit-create-food.component.html',
  styleUrls: ['./modal-edit-create-food.component.css']
})
export class ModalEditCreateFoodComponent implements OnInit, AfterViewInit {
  id: number;
  name: string;
  amount: string;
  price: number;
  picture: string;
  currentPicture: string
  categoryId: number;
  headerTitle: string = ''; 
  categories!: Category[];

  validate: MatFormField[] = [];

  @ViewChild('inputPicture') inputPicture!: MatFormField;
  @ViewChild('inputName') inputName!: MatFormField;
  @ViewChild('inputPrice') inputPrice!: MatFormField;
  @ViewChild('inputAmount') inputAmount!: MatFormField;
  @ViewChild('inputCategoryId') inputCategoryId!: MatFormField;

  constructor(
    public dialogRef: MatDialogRef<ModalEditCreateFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food,
    categoryService: CategoryService 
  ) {
    this.id = data.id;
    this.name = data.name;
    this.amount = data.amount;
    this.price = data.price;
    this.picture = data.picture;
    this.currentPicture = this.picture;
    this.categoryId = data.categoryId;
    categoryService
      .get('?order=id&pagination=false')
      .subscribe((res) => {
        this.categories = res.rows;
      });

  }
  ngAfterViewInit(): void {
    this.validate = [
      this.inputPicture,
      this.inputName,
      this.inputPrice,
      this.inputAmount,
      this.inputCategoryId
    ]
  }

  ngOnInit(): void {
    this.headerTitle = this.id? 'Editar Plato': 'Crear Plato'
  }

  onClickNo(): void {
    this.dialogRef.close();
  }

  onClickAcept(): void {
    let valid: boolean = true;

    for (let element of this.validate){
      if (element._control.empty){
        element._elementRef.nativeElement.scrollIntoView({beavior: 'smooth'});
        valid = false;
        break;
      };
    };
    if (valid){
      this.dialogRef.close({
        id: this.id,
        picture: this.picture,
        name: this.name,
        price: this.price,
        amount: this.amount,
        categoryId: this.categoryId
      });
    };
  }

  pictureError(): void {
    this.currentPicture = 'https://th.bing.com/th/id/OIP.D5oYHJqHl2U4NWJHYoBN8AHaHa?pid=ImgDet&rs=1';
  }
}

