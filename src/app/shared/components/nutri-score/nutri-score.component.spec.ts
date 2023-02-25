import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriScoreComponent } from './nutri-score.component';

describe('NutriScoreComponent', () => {
  let component: NutriScoreComponent;
  let fixture: ComponentFixture<NutriScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutriScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutriScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
