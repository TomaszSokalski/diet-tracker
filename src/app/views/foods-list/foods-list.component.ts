import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, startWith, Subject, takeUntil } from 'rxjs';
import { Food } from 'src/app/interfaces/food.interface';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { DISPLAYED_COLUMNS } from './displayed-columns.const';
import { FoodListState } from './state/food-list.state';

@Component({
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss'],
})
export class FoodsListComponent implements OnInit, OnDestroy {
  search = new FormControl('');
  foods$ = this.foodListState.food$;
  loading$ = this.foodListState.loading$;
  displayedColumns = DISPLAYED_COLUMNS;

  private destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog, private foodListState: FoodListState) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(takeUntil(this.destroy$), startWith(''), debounceTime(200))
      .subscribe((formValue) => {
        return this.foodListState.searchFoods(formValue!);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  deleteFood(id: string): void {
    this.foodListState.deleteFood(id);
  }

  editFood(id: string): void {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
        data: { id, isReadonly: false },
      })
      .afterClosed()
      .subscribe(() => {
        this.getUpdatedFoods();
      });
  }

  addFood(): void {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe(() => {
        this.getUpdatedFoods();
      });
  }

  getUpdatedFoods(): void {
    this.foodListState.getFoods();
  }

  showFoodDetails(food: Food): void {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: { food, isReadonly: true },
    });
  }
}
