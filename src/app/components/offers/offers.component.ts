import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Offer } from 'src/app/models/offer.model';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  
  @ViewChild('searchInput') searchInput!: ElementRef;

  offers?: Offer[]
  order: string = 'name';
  direction: string = 'asc';
  limit: number = 10;
  offset: number = 0;
  count: number = 0;
  search: string ='';

  constructor(private offerService: OfferService) {}

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

  update() {
    this.offerService.get(this.getQuerys()).subscribe((data) => {
      this.offers = data.rows;
    });
  }

  ngOnInit(): void {
    this.offerService.get('').subscribe((data) => {
      this.offers = data.rows;
    });
  }
}
