import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() order!: Order;
  @Output() updateEmitter = new EventEmitter<any>();
  @Input() isAdmin!: boolean;
  categoriesFoods!: any[];
 
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.categoriesFoods = this.orderService.order(this.order);
  }

  update(){
    this.updateEmitter.emit();
  }


}
