import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { ModalEditCreateOrderComponent } from '../modal-edit-create-order/modal-edit-create-order.component';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;

  orders!: Order[];
  order: string = 'name';
  direction: string = 'asc';
  limit: number = 10;
  offset: number = 0;
  count: number = 0;
  search: string = '';
  loading: boolean = false;
  isAdmin: boolean = false;


  constructor(
    public dialog: MatDialog,
    
    private orderService: OrderService,
    private usersService: UsersService
  ) {}

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
    this.usersService.getUser().subscribe((data) => {
      this.isAdmin = data.isAdmin;
    });
    this.loading = true;
    this.orderService.get('').subscribe((data) => {
      this.orders = data.rows;
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
   * open dialog to create a new order
   */
  openDialog(){
    let dialogRef;

    dialogRef = this.dialog.open(ModalEditCreateOrderComponent,{
      width: '450px',
      data: {}
    })
    
    dialogRef?.afterClosed()
    .pipe(
      switchMap((res) => {
        return this.orderService.add(res);
      })
    )
    .subscribe(() => {
      this.update();
    })
  }

  /**
   * Update the list of orders
   */
  update() {
    this.loading = true;
    this.orderService.get(this.getQuerys()).subscribe((data) => {
      this.orders = data.rows;
      this.count = data.count;
      this.loading = false;
    });
  }
}
