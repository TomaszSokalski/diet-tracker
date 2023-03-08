import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, filter, startWith, takeUntil } from 'rxjs';
import { Destroyable } from 'src/app/components/destroyable';
import { Food } from 'src/app/interfaces/food.interface';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { DISPLAYED_COLUMNS } from './displayed-columns.const';
import { FoodListState } from './state/food-list.state';

@Component({
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss'],
})
export class FoodsListComponent extends Destroyable implements OnInit {
  displayedColumns = DISPLAYED_COLUMNS;

  search = new FormControl('');

  foods$ = this.foodListState.food$;
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
      .pipe(takeUntil(this.destroyed$), startWith(''), debounceTime(500))
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
        this.showSnackBar('Food updated successfully');
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
        this.showSnackBar('Food added successfully');
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
        takeUntil(this.destroyed$),
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
