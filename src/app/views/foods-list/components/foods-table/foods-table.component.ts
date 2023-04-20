import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { debounceTime, filter, startWith, takeUntil } from 'rxjs';

import { UnsubscribeComponent } from '@shared/unsubscribe';
import { Food } from '@views/foods-list/interfaces/food.interface';
import { FoodListState } from '@views/foods-list/state/food-list.state';
import { AddEditFoodComponent } from '@views/foods-list/components/add-edit-food/add-edit-food.component';
import { FoodDetailComponent } from '../food-detail/food-detail.component';
import { DISPLAYED_COLUMNS } from './displayed-columns.const';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-foods-table',
  templateUrl: './foods-table.component.html',
  styleUrls: ['./foods-table.component.scss'],
})
export class FoodsTableComponent
  extends UnsubscribeComponent
  implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = DISPLAYED_COLUMNS;
  dataSource = new MatTableDataSource<Food>();

  foods$ = this.foodListState.foods$;
  loading$ = this.foodListState.loading$;
  error$ = this.foodListState.error$;
  tags$ = this.foodListState.tags$;

  form = this.fb.group({
    foodName: [null],
    tags: [null],
  });

  constructor(
    private dialog: MatDialog,
    private foodListState: FoodListState,
    private snackbar: MatSnackBar,
    private fb: UntypedFormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.initialFoodsData();
    this.onFormChanged();
    this.listenToErrors();
    this.getTags();
    this.getUpdatedFoods();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addFood(): void {
    this.dialog
      .open(AddEditFoodComponent, {
        data: { add: true},
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
        data: {id, add: false},
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

  onFoodDetails(food: Food): void {
    this.dialog.open(FoodDetailComponent, {
      width: '50%',
      data: food,
    });
  }

  private getTags() {
    this.foodListState.getTags();
  }

  private initialFoodsData(): void {
    this.foods$.pipe(takeUntil(this.destroy$)).subscribe((food) => {
      this.dataSource.data = food;
    });
  }

  private onFormChanged(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$), startWith(''), debounceTime(500))
      .subscribe((formValue) => {
        return this.foodListState.searchFoods(
          formValue.foodName,
          formValue.tags
        );
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
