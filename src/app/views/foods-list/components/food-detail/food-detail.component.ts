import { Component, Inject, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';

import { FoodListState } from '../../state/food-list.state';
import { UnsubscribeComponent } from '@app/shared/unsubscribe';
import { Food } from '../../interfaces/food.interface';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent
  extends UnsubscribeComponent
  implements OnInit
{
  displayedColumns: string[] = [];
  dataSource: Food[] = [];

  food$ = this.foodListState.food$;
  private id = this.data.id;

  constructor(
    private foodListState: FoodListState,
    public dialogRef: MatDialogRef<FoodDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food
  ) {
    super();
  }

  ngOnInit(): void {
    this.onFoodDetails();
  }

  close() {
    this.dialogRef.close();
  }

  private onFoodDetails(): void {
    if (this.id) {
      this.foodListState.getFoodById(this.id);
      this.food$.pipe(takeUntil(this.destroy$)).subscribe((food) => {
        this.dataSource.push(food);
      });

      const columns = ['name', 'weight', 'caloriesPer100g', 'nutriScore'];
      for (const key in this.data) {
        if (columns.includes(key)) {
          this.displayedColumns.push(key);
        }
      }
    }
  }
}
