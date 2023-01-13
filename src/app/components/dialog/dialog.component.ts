import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodListService } from '../../services/food-list.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  isLoading = false;
  addForm = this.fb.group({
    name: ['', [Validators.required]],
    weight: ['', [Validators.required, Validators.min(0)]],
    caloriesPer100g: ['', [Validators.min(0)]],
    nutriScore: [''],
  });

  constructor(
    private foodService: FoodListService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public id: string,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.setFormValue();
  }

  private setFormValue() {
    if (this.id) {
      this.foodService
        .getFood(this.id)
        .subscribe((food) => this.addForm.patchValue(food as any)); //TODO type correct
    }
  }

  get weight(): FormControl {
    return this.addForm.get('weight') as FormControl;
  }

  onSubmit(): void {
    if (this.addForm.invalid) {
      return;
    }

      const action$ = this.id !== undefined && this.id !== null ?
        this.foodService
            .updateFood(this.addForm.value, this.id)
        : this.foodService.postFood(this.addForm.value);

      action$.subscribe(() => this.dialogRef.close());
  }

  close() {
    this.dialogRef.close();
  }
}
