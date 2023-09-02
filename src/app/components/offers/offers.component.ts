import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/offer.model';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offers!: Offer[];

  constructor(private offerService: OfferService) {}
  
  ngOnInit(): void {
    this.offerService.get('').subscribe((data) => {
      this.offers = data.rows;
    });
  }
}
