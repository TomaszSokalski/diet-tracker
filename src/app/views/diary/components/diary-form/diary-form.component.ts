import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Diary } from '@views/diary/interfaces/diary.interface';
import { Food } from '@views/foods-list/interfaces/food.interface';
import { FoodListState } from '@views//foods-list/state/food-list.state';
import { DiaryService } from '../../services/diary.service';
import { DiaryState } from '../../state/diary.state';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.scss'],
})
export class DiaryFormComponent implements OnInit {
  foods$ = this.foodListState.foods$;
  today = new Date();
  maxDate = new Date();
  form: FormGroup;

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

  private initForm(): void {
    this.form = this.fb.group({
      date: [null, [Validators.required]],
      foods: [null, [Validators.required]],
      weight: [null, [Validators.required, Validators.min(0)]],
    });
  }

  private diaryPayload(diaryForm: FormGroup): Diary {
    const date = this.date;
    const formattedDate = this.datePipe.transform(date?.value, 'yyyy-MM-dd');
    const { value } = diaryForm;
    return {
      id: value.id,
      date: formattedDate!,
      foods: [
        {
          id: value.foods.id,
          weight: value.weight,
        },
      ],
    };
  }

  private resetInputs(): void {
    this.weight?.reset();
    this.weight?.setErrors(null);
    this.foods?.reset();
    this.foods?.setErrors(null);
  }
}
