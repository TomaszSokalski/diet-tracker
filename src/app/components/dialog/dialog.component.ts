import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Food } from 'src/app/interfaces/food.interface';
import { FoodListService } from '../../services/food-list.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  addForm = this.fb.group({
    name: ['', [Validators.required]],
    weight: ['', [Validators.required, Validators.min(0)]],
    caloriesPer100g: ['', [Validators.min(0)]],
    nutriScore: [''],
    hasNutriScore: [true],
  });

  constructor(
    private foodService: FoodListService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public id: string,
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
      this.foodService
        .getFood(this.id)
        .subscribe((food) => {
          return this.addForm.patchValue(food as any);
        }); //TODO type correct
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
