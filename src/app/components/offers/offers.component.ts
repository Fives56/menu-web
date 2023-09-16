import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Offer } from 'src/app/models/offer.model';
import { OfferService } from 'src/app/services/offer.service';
import { ModalEditCreateOfferComponent } from '../modal-edit-create-offer/modal-edit-create-offer.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  
  @ViewChild('searchInput') searchInput!: ElementRef;

  offers!: Offer[];
  order: string = 'name';
  direction: string = 'asc';
  limit: number = 10;
  offset: number = 0;
  count: number = 0;
  search: string ='';
  loading: boolean = false;
  

  constructor(
    public dialog: MatDialog,
    private offerService: OfferService) {}

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

  ngOnInit(): void {
    this.loading = true;
    this.offerService.get('').subscribe((data) => {
      this.offers = data.rows;
      this.count = data.count;
      this.loading = false;
    });
  }

  /**
   * Update the offset
   * @param offset offset recived of paginator
   */
  updateOffset(offset: number) {
    this.offset = offset;
    this.update();
  }

  /**
   * open dialog to create a new offer
   */
  openDialog(){
    let dialogRef;

    dialogRef = this.dialog.open(ModalEditCreateOfferComponent,{
      width: '450px',
      data: {}
    })
    
    dialogRef?.afterClosed()
    .pipe(
      switchMap((res) => {
        return this.offerService.add(res);
      })
    )
    .subscribe(() => {
      this.update();
    })
  }

  /**
   * Update the list of offers
   */
  update() {
    this.loading = true;
    this.offerService.get(this.getQuerys()).subscribe((data) => {
      this.offers = data.rows;
      this.count = data.count;
      this.loading = false;
    });
  }
}
