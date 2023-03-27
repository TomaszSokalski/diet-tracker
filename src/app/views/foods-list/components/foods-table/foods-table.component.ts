import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, startWith, takeUntil } from 'rxjs';

import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { UnsubscribeComponent } from '@shared/unsubscribe';
import { Food } from '@views/foods-list/interfaces/food.interface';
import { FoodListState } from '@views/foods-list/state/food-list.state';
import { AddEditFoodComponent } from '../add-edit-food/add-edit-food.component';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DISPLAYED_COLUMNS } from './displayed-columns.const';

@Component({
  selector: 'app-foods-table',
  templateUrl: './foods-table.component.html',
  styleUrls: ['./foods-table.component.scss'],
})
export class FoodsTableComponent
  extends UnsubscribeComponent
  implements OnInit
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = DISPLAYED_COLUMNS;
  search = new FormControl(null);
  dataSource = new MatTableDataSource<Food>();

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
    this.searchOnFoods();
    this.listenToErrors();
    this.initialFoodsData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addFood(): void {
    this.dialog
      .open(AddEditFoodComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe(() => {
        this.getUpdatedFoods();
      });
  }

  editFood(id: string): void {
    this.dialog
      .open(AddEditFoodComponent, {
        width: '50%',
        data: { id },
      })
      .afterClosed()
      .subscribe(() => {
        this.getUpdatedFoods();
      });
  }

  deleteFood(id: string): void {
    this.foodListState.deleteFood(id);
    this.showSnackBar('Food deleted successfully');
  }

  showFoodDetails(food: Food): void {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: { food },
    });
  }

  private initialFoodsData(): void {
    this.foods$.pipe(takeUntil(this.destroy$)).subscribe((food) => {
      this.dataSource.data = food;
      this.dataSource.paginator = this.paginator;
    });
  }

  private searchOnFoods(): void {
    this.search.valueChanges
      .pipe(takeUntil(this.destroy$), startWith(''), debounceTime(500))
      .subscribe((formValue) => {
        return this.foodListState.searchFoods(formValue!);
      });
  }

  private getUpdatedFoods(): void {
    this.foodListState.getFoods();
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
