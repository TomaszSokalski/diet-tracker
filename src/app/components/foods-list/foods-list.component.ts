import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, finalize, map, Subject, takeUntil } from 'rxjs';
import { Food } from 'src/app/interfaces/food.interface';
import { FoodListService } from 'src/app/services/food-list.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss'],
})
export class FoodsListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  search = new FormControl('');
  foods$ = new Subject<Object>(); // nie przypisujemy danych bezpośrednio, tylko robimy subject typu Food
  loading$ = new Subject<boolean>();
  isLoading = false;
  response$ = this.foodService.food;
  dataSource$ = this.foodService.food.pipe(map((response) => response.data));
  displayedColumns: string[] = [
    'name',
    'weight',
    'caloriesPer100g',
    'nutriScore',
    'action',
  ];
  dataSource: MatTableDataSource<Food>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private foodService: FoodListService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getData(); // pobieramy dane inicjalnie

    // można wydzielić to do metody listenForSearchValueChanges...
    this.search.valueChanges // śledzenie wartości formularza
      .pipe(
        takeUntil(this.destroy$), // nasłuchiwanie tylko do momentu destroy komponentu, zapobiega wyciekowi danych
        debounceTime(200) // gdy przerwa trwa 200 ms to dopiero wtedy strzał
      )
      .subscribe((formValue) => {
        return this.getData(formValue!); // pobieramy dane na kazdej zmianie
      });
  }

  private getData(searchBy?: string) {
    this.loading$.next(true); // włączamy loaderek bo jest szukanie

    this.foodService.searchFoods(searchBy).subscribe({
      // pobierz dane z backu
      next: (data) => {
        this.foods$.next(data); // update danych nową wartością z backendu
      },
      complete: () => {
        this.loading$.next(false); // niezalenie czy sukces czy błąd, wyłączamy loaderek
      },
    });
  }

  deleteFood(id: string) {
    this.isLoading = true;
    this.foodService
      .deleteFood(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.response$ = this.foodService.food;
      });
  }

  editFood(id: string) {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
        data: id,
      })
      .afterClosed()
      .subscribe(() => {
        this.response$ = this.foodService.food;
      });
  }

  addFood() {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe(() => {
        this.response$ = this.foodService.food;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
