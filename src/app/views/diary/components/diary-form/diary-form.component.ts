import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FoodListState } from '@views//foods-list/state/food-list.state';
import { Food } from '@views/foods-list/interfaces/food.interface';
import { DiaryService } from '../../services/diary.service';
import { DiaryState } from '../../state/diary.state';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DiaryPayload } from '../../interfaces/diary.interface';
import { MealType } from './meal-type';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.scss'],
})
export class DiaryFormComponent implements OnInit {
  foods$ = this.foodListState.foods$;
  diary$ = this.diaryState.diary$;
  today = new Date();
  maxDate = new Date();
  form: FormGroup;
  mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack', 'training'];

  constructor(
    private fb: FormBuilder,
    private foodListState: FoodListState,
    private diaryService: DiaryService,
    private diaryState: DiaryState,
    private datePipe: DatePipe
  ) {}

  get date() {
    return this.form.get('date');
  }

  get weight() {
    return this.form.get('weight');
  }

  get foods() {
    return this.form.get('foods');
  }

  get mealType() {
    return this.form.get('mealType');
  }

  ngOnInit(): void {
    this.initForm();
    this.foodListState.getFoods();
    this.date?.setValue(this.today);
  }

  addFoodToDiary(): void {
    if (this.form.invalid) {
      return;
    }
    const payload = this.diaryPayload(this.form);
    this.diaryService.postFoodToDiary(payload).subscribe(() => {
      this.diaryState.getDiary(payload.date);
    });

    this.resetInputs();
  }

  onDateChange(event: MatDatepickerInputEvent<string>): void {
    if (!event.value) {
      return;
    }
    const transformedData = this.datePipe.transform(event.value, 'yyyy-MM-dd');
    this.diaryState.getDiary(transformedData!);
  }

  getFoodWeight(event: Food): void {
    const { weight } = event;
    this.weight?.setValue(weight);
  }

  getMealType(event: MealType): void {
    console.log(event);
  }

  private initForm(): void {
    this.form = this.fb.group({
      date: [null, [Validators.required]],
      foods: [null, [Validators.required]],
      weight: [null, [Validators.required, Validators.min(0)]],
      mealType: [null, [Validators.required]],
    });
  }

  private diaryPayload(diaryForm: FormGroup): DiaryPayload {
    const date = this.date;
    const formattedDate = this.datePipe.transform(date?.value, 'yyyy-MM-dd');
    const { value } = diaryForm;
    return {
      id: value.id,
      date: formattedDate!,
      food: {
        id: value.foods.id,
        weight: value.weight,
        mealType: value.mealType,
      },
    };
  }

  private resetInputs(): void {
    this.weight?.reset();
    this.weight?.setErrors(null);
    this.foods?.reset();
    this.foods?.setErrors(null);
    this.mealType?.reset();
    this.mealType?.setErrors(null);
  }
}
