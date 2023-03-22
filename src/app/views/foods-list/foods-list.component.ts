import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, startWith, takeUntil } from 'rxjs';

import { Food } from '@interfaces/food.interface';
import { UnsubscribeComponent } from '@unsubscribe';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { FoodListState } from './state/food-list.state';

import { DISPLAYED_COLUMNS } from './displayed-columns.const';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss'],
})
export class FoodsListComponent extends UnsubscribeComponent implements OnInit {
  displayedColumns = DISPLAYED_COLUMNS;
  search = new FormControl('');

  foods$ = this.foodListState.foods$;
  loading$ = this.foodListState.loading$;
  error$ = this.foodListState.error$;

  constructor(
    private dialog: MatDialog,
    private foodListState: FoodListState,
    private snackbar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.initialValue();
    this.listenToErrors();
  }

  initialValue(): void {
    this.search.valueChanges
      .pipe(takeUntil(this.destroy$), startWith(''), debounceTime(500))
      .subscribe((formValue) => {
        return this.foodListState.searchFoods(formValue!);
      });
  }

  deleteFood(id: string): void {
    this.foodListState.deleteFood(id);
    this.showSnackBar('Food deleted successfully');
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

  private listenToErrors() {
    this.error$
      .pipe(
        takeUntil(this.destroy$),
        filter((e) => e !== null)
      )
      .subscribe((err) => {
        this.showSnackBar(err?.message ?? 'Error');
      });
  }

  private showSnackBar(message: string) {
    this.snackbar.open(message);
  }
}
