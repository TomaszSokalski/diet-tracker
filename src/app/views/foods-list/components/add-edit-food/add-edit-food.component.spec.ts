import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFoodComponent } from './add-edit-food.component';

describe('AddEditFoodComponent', () => {
  let component: AddEditFoodComponent;
  let fixture: ComponentFixture<AddEditFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
