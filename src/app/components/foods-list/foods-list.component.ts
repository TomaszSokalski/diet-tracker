import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize, map } from 'rxjs';
import { FoodListService } from 'src/app/services/food-list.service';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss'],
})
export class FoodsListComponent implements OnInit {
  response$ = this.foodService.food;
  isLoading = false;
  dataSource$ = this.foodService.food.pipe(map((response) => response.data));
  displayedColumns: string[] = [
    'name',
    'weight',
    'caloriesPer100g',
    'nutriScore',
    'action',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private foodService: FoodListService, public dialog: MatDialog) {}

  ngOnInit(): void {}

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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
