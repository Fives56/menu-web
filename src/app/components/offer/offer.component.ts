import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Offer } from 'src/app/models/offer.model';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  @Input() offer!: Offer;
  @Output() updateEmitter = new EventEmitter<any>();
  categoriesFoods!: any[];
 
  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.categoriesFoods = this.offerService.order(this.offer);
  }

  update(){
    this.updateEmitter.emit();
  }


}
