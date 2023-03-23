import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs';

import { Food } from '@interfaces/food.interface';
import { UnsubscribeComponent } from '@unsubscribe';
import { DialogData } from '@views/foods-list/dialog-data.interface';
import { FoodListService } from '@views/foods-list/services/food-list.service';
import { FoodListState } from '@views/foods-list/state/food-list.state';
import { NUTRI_SCORE } from './nutri-score.const';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DISPLAYED_COLUMNS } from './displayed-columns.const';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent extends UnsubscribeComponent implements OnInit {
  food$ = this.foodListState.food$;

  displayedColumns = DISPLAYED_COLUMNS;
  dataSource: Food[] = [this.data?.food];
  nutriScores = NUTRI_SCORE;

  addForm = this.fb.group({
    name: ['', [Validators.required]],
    weight: [0, [Validators.required, Validators.min(0)]],
    caloriesPer100g: [0, [Validators.min(0)]],
    nutriScore: [''],
    hasNutriScore: [false],
  });

  private id = this.data?.id;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private foodListState: FoodListState,
    private foodService: FoodListService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    super();
  }

  ngOnInit(): void {
    this.setFormValue();
    this.hasNutriScore.valueChanges.subscribe((value) => {
      const nutriScore = this.addForm.get('nutriScore');
      if (value) {
        nutriScore?.enable();
      } else {
        nutriScore?.reset();
        nutriScore?.disable();
      }
    });
  }

  get hasNutriScore(): FormControl {
    return this.addForm.get('hasNutriScore') as FormControl;
  }

  addFood(): void {
    if (this.addForm.invalid) {
      return;
    }
    const payload = this.createPayLoad(this.addForm);
    const action$ =
      this.id !== undefined && this.id !== null
        ? this.foodService.updateFood(payload, this.id)
        : this.foodService.postFood(payload);

    action$.subscribe(() => this.dialogRef.close());
  }

  close() {
    this.dialogRef.close();
  }

  private setFormValue() {
    if (this.id) {
      this.foodListState.getFoodById(this.id);
      this.food$.pipe(takeUntil(this.destroy$)).subscribe((food) => {
        this.addForm.patchValue(food);
        this.addForm.markAsPristine();
      });
    }
  }

  private createPayLoad(addForm: FormGroup): Food {
    const { value } = addForm;
    return {
      id: value.id,
      name: value.name,
      weight: value.weight,
      caloriesPer100g: value.caloriesPer100g,
      nutriScore: value.nutriScore,
    };
  }
}
