import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditCreateFoodComponent } from './modal-edit-create-food.component';

describe('ModalEditCreateFoodComponent', () => {
  let component: ModalEditCreateFoodComponent;
  let fixture: ComponentFixture<ModalEditCreateFoodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditCreateFoodComponent]
    });
    fixture = TestBed.createComponent(ModalEditCreateFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
