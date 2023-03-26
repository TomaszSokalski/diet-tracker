import { Component, Inject } from '@angular/core';

import { DialogData } from './dialog-data.interface';
import { Food } from '@views/foods-list/interfaces/food.interface';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  displayedColumns: string[] = [];
  dataSource: Food[] = [this.data.food];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.columnsToDisplay();
  }

  close() {
    this.dialogRef.close();
  }

  private columnsToDisplay(): void {
    const columns = ['name', 'weight', 'caloriesPer100g', 'nutriScore'];
    for (const [key, value] of Object.entries(this.data.food)) {
      if (columns.includes(key) && value !== null) {
        this.displayedColumns.push(key);
      }
    }
  }
}
