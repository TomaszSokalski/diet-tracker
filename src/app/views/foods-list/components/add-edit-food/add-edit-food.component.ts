import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { UnsubscribeComponent } from '@shared/unsubscribe';
import { DialogData } from '@shared/components/dialog/dialog-data.interface';
import { NutriScore } from '@shared/components/nutri-score/nutri-score.enum';
import { Food } from '@views/foods-list/interfaces/food.interface';
import { FoodListState } from '@views/foods-list/state/food-list.state';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-food',
  templateUrl: './add-edit-food.component.html',
  styleUrls: ['./add-edit-food.component.scss'],
})
export class AddEditFoodComponent
  extends UnsubscribeComponent
  implements OnInit
{
  food$ = this.foodListState.food$;
  postFood$ = this.foodListState.postFood$;
  updatedFood$ = this.foodListState.updatedFood$;

  form: FormGroup;

  readonly nutriscore = Object.keys(NutriScore);
  private id = this.data?.id;

  constructor(
    private foodListState: FoodListState,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditFoodComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.setFormValue();
    this.onNutriScoreChanges();
  }

  get hasNutriScore() {
    return this.form.get('hasNutriScore');
  }

  addFood(): void {
    if (this.form.invalid) {
      return;
    }
    const payload = this.createPayLoad(this.form);
    this.id !== undefined && this.id !== null
      ? this.foodListState.updateFood(payload, this.id)
      : this.foodListState.postFood(payload);

    this.postFood$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.dialogRef.close());
    this.updatedFood$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.dialogRef.close());
  }

  close() {
    this.dialogRef.close();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      weight: [null, [Validators.required, Validators.min(1)]],
      caloriesPer100g: [null, [Validators.min(0)]],
      nutriScore: [null],
      hasNutriScore: [false],
    });
  }

  private setFormValue(): void {
    if (this.id) {
      this.foodListState.getFoodById(this.id);
      this.food$.pipe(takeUntil(this.destroy$)).subscribe((food) => {
        this.form.patchValue(food);
        this.form.markAsPristine();
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

  private onNutriScoreChanges(): void {
    this.hasNutriScore?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        const nutriScore = this.form.get('nutriScore');
        if (value) {
          nutriScore?.enable();
        } else {
          nutriScore?.reset();
          nutriScore?.disable();
        }
      });
  }
}