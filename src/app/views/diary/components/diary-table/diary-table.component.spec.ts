import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryTableComponent } from './diary-table.component';

describe('DiaryTableComponent', () => {
  let component: DiaryTableComponent;
  let fixture: ComponentFixture<DiaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
