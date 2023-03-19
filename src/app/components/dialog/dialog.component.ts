import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Food } from 'src/app/interfaces/food.interface';
import { NutriScore } from 'src/app/shared/components/nutri-score/nutri-score.enum';
import { DialogData } from 'src/app/views/foods-list/dialog-data.interface';
import { FoodListService } from '../../views/foods-list/services/food-list.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  food$ = new Subject<Food>();
  addForm = this.fb.group({
    name: ['', [Validators.required]],
    weight: [0, [Validators.required, Validators.min(0)]],
    caloriesPer100g: [0, [Validators.min(0)]],
    nutriScore: [''],
    hasNutriScore: [false],
  });
  readonly nutriscore = Object.keys(NutriScore);

  private id = this.data?.id;

  constructor(
    private foodService: FoodListService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

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

  private setFormValue() {
    if (this.id) {
      this.foodService.getFood(this.id).subscribe((food) => {
        this.addForm.patchValue(food); // change service to state
      });
    }
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
