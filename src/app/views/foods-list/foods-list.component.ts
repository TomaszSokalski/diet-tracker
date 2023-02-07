import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCardLgImage } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  debounceTime,
  finalize,
  startWith,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { Food } from 'src/app/interfaces/food.interface';
import { FoodListService } from 'src/app/views/services/food-list.service';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { DISPLAYED_COLUMNS } from './displayed-columns.const';

@Component({
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss'],
})
export class FoodsListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  search = new FormControl('');
  foods$ = new Subject<Food[]>(); // nie przypisujemy danych bezpośrednio, tylko robimy subject typu Food
  loading$ = new Subject<boolean>();
  displayedColumns = DISPLAYED_COLUMNS;
  private destroy$ = new Subject<void>();
  readonly = false;
  constructor(private foodService: FoodListService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(takeUntil(this.destroy$), startWith(''), debounceTime(200))
      .subscribe((formValue) => {
        return this.getData(formValue!);
      });
  }

  private getData(searchBy?: string): void {
    this.loading$.next(true);

    this.foodService
      .searchFoods(searchBy)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.foods$.next(response.data);
        },
        complete: () => {
          this.loading$.next(false);
        },
      });
  }

  deleteFood(id: string): void {
    this.foodService
      .deleteFood(id)
      .pipe(
        finalize(() => {
          this.loading$.next(false);
        })
      )
      .subscribe(() => {
        this.getUpdatedFood();
      });
  }

  editFood(id: string): void {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
        data: { id, isReadonly: false },
      })
      .afterClosed()
      .subscribe(() => {
        this.getUpdatedFood();
      });
  }

  addFood(): void {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe(() => {
        this.getUpdatedFood();
      });
  }

  getUpdatedFood(): void {
    this.foodService.food.subscribe((food) => this.foods$.next(food.data));
  }

  showFoodDetails(id: string): void {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: { id, isReadonly: true },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}