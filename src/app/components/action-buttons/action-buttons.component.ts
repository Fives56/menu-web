import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalEditCreateFoodComponent } from '../modal-edit-create-food/modal-edit-create-food.component';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent {
  @Input() food?: Food; 
  @Output() updateEmitter = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog, 
    private foodService: FoodService
  ){}
  
  /**
   * delete food method
   */
  delete(){
    let dialogRef;

    dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '300px'
    });

    dialogRef.afterClosed()
      .pipe(
        filter( res => !!res),
        switchMap(() => {
          return this.food 
            ? this.foodService.delete(this.food)
            : 'No se encontro el plato' ;
        })
      )
      .subscribe(() => {
        this.updateEmitter.emit();
      })
  }

  /**
   * Open a dialog box to edit or create food
   * @param data - object whit the data of the food to be create or edited 
   */
  openDialog(){
    let dialogRef;

    if(this.food){
      const data = {
        id: this.food.id,
        name: this.food.name,
        picture: this.food.picture,
        amount: this.food.amount,
        price: this.food.price,
        categoryId: this.food.categoryId,
      }

      dialogRef = this.dialog.open(ModalEditCreateFoodComponent,{
      height: '415px',
      width: '350px',
      data: data,
    })
  }
  
  dialogRef?.afterClosed()
    .pipe(
      switchMap((res) => {
        return this.foodService.update(res);
      })
    )
    .subscribe(() => {
      this.updateEmitter.emit();
    })
  }
}
