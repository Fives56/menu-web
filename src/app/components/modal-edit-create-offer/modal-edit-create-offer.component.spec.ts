import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditCreateOfferComponent } from './modal-edit-create-offer.component';

describe('ModalEditCreateOfferComponent', () => {
  let component: ModalEditCreateOfferComponent;
  let fixture: ComponentFixture<ModalEditCreateOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditCreateOfferComponent]
    });
    fixture = TestBed.createComponent(ModalEditCreateOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
