import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { Food } from 'src/app/models/food.model';
import { Order } from 'src/app/models/order.model';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalEditCreateFoodComponent } from '../modal-edit-create-food/modal-edit-create-food.component';
import { ModalEditCreateOrderComponent } from '../modal-edit-create-order/modal-edit-create-order.component';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent {
  @Input() isOrder!: boolean; 
  @Input() target!: any; 
  @Output() updateEmitter = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog, 
    private foodService: FoodService,
    private orderService: OrderService
  ){}
  
  /**
   * delete food or order method
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
          return (this.isOrder)
            ? this.orderService.delete(this.target)
            : this.foodService.delete(this.target);
        })
      )
      .subscribe(() => {
        this.updateEmitter.emit();
      })
  }

  /**
   * Open a dialog box to edit  food or order
   * @param data - object whit the data of the food or order to be edited 
   */
  openDialog(){
    let dialogRef;

    if(this.target && !this.isOrder){
      const data = {
        id: this.target.id,
        name: this.target.name,
        picture: this.target.picture,
        amount: this.target.amount,
        price: this.target.price,
        categoryId: this.target.categoryId,
      }

      dialogRef = this.dialog.open(ModalEditCreateFoodComponent,{
       width: '380px',
        data: data,
      })
    }
    
    else if ( this.target && this.isOrder) {
      const data = {
        id: this.target.id,
        name: this.target.name,
        price: this.target.price,
        categories: this.target.categories,
        food: this.target.food
      }

      dialogRef = this.dialog.open(ModalEditCreateOrderComponent,{
        width: '450px',
        data: data,
       })

    }
  
  dialogRef?.afterClosed()
    .pipe(
      filter(res => !!res),
      switchMap((res) => {
        return (this.isOrder)
        ? this.orderService.update(res)
        : this.foodService.update(res);
        
      })
    )
    .subscribe(() => {
      this.updateEmitter.emit();
    })
  }
}
