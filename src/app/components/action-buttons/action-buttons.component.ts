import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { Food } from 'src/app/models/food.model';
import { Offer } from 'src/app/models/offer.model';
import { FoodService } from 'src/app/services/food.service';
import { OfferService } from 'src/app/services/offer.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalEditCreateFoodComponent } from '../modal-edit-create-food/modal-edit-create-food.component';
import { ModalEditCreateOfferComponent } from '../modal-edit-create-offer/modal-edit-create-offer.component';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent {
  @Input() isOffer!: boolean; 
  @Input() target!: any; 
  @Output() updateEmitter = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog, 
    private foodService: FoodService,
    private offerService: OfferService
  ){}
  
  /**
   * delete food or offer method
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
          return (this.isOffer)
            ? this.offerService.delete(this.target)
            : this.foodService.delete(this.target);
        })
      )
      .subscribe(() => {
        this.updateEmitter.emit();
      })
  }

  /**
   * Open a dialog box to edit  food or offer
   * @param data - object whit the data of the food or offer to be edited 
   */
  openDialog(){
    let dialogRef;

    if(this.target && !this.isOffer){
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
    
    else if ( this.target && this.isOffer) {
      const data = {
        id: this.target.id,
        name: this.target.name,
        price: this.target.price,
        categories: this.target.categories,
        food: this.target.food
      }

      dialogRef = this.dialog.open(ModalEditCreateOfferComponent,{
        width: '450px',
        data: data,
       })

    }
  
  dialogRef?.afterClosed()
    .pipe(
      filter(res => !!res),
      switchMap((res) => {
        return (this.isOffer)
        ? this.offerService.update(res)
        : this.foodService.update(res);
        
      })
    )
    .subscribe(() => {
      this.updateEmitter.emit();
    })
  }
}
