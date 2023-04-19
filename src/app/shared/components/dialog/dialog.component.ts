import { Component, Inject, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';

import { DialogData } from './dialog-data.interface';
import { Food } from '@views/foods-list/interfaces/food.interface';
import { FoodListState } from '@app/views/foods-list/state/food-list.state';
import { UnsubscribeComponent } from '@app/shared/unsubscribe';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent extends UnsubscribeComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: Food[] = [];

  food$ = this.foodListState.food$;
  private id = this.data.id;

  constructor(
    private foodListState: FoodListState,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
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
