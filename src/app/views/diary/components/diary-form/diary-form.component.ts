import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Diary } from 'src/app/interfaces/diary.interface';
import { Food } from 'src/app/interfaces/food.interface';
import { FoodListState } from 'src/app/views/foods-list/state/food-list.state';
import { DiaryService } from '../../services/diary.service';
import { DiaryState } from '../../state/diary.state';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.scss'],
})
export class DiaryFormComponent implements OnInit {
  foods$ = this.foodListState.food$;
  today = new Date();
  maxDate = new Date();
  diaryForm = this.fb.group({
    date: ['', [Validators.required]],
    foods: ['', [Validators.required]],
    weight: ['', [Validators.required, Validators.min(0)]],
  });

  constructor(
    private fb: FormBuilder,
    private foodListState: FoodListState,
    private diaryService: DiaryService,
    private diaryState: DiaryState,
    private datePipe: DatePipe
  ) {}

  get date(): FormControl {
    return this.diaryForm.get('date') as FormControl;
  }

  get weight(): FormControl {
    return this.diaryForm.get('weight') as FormControl;
  }

  get foods(): FormControl {
    return this.diaryForm.get('foods') as FormControl;
  }

  ngOnInit(): void {
    this.foodListState.getFoods();
    this.date.setValue(this.today);
  }

  addFoodToDiary(): void {
    if (this.diaryForm.invalid) {
      return;
    }
    const payload = this.diaryPayload(this.diaryForm);
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
    this.weight.setValue(weight);
  }

  private diaryPayload(diaryForm: FormGroup): Diary {
    const date = this.date;
    const formattedDate = this.datePipe.transform(date.value, 'yyyy-MM-dd');
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
    this.weight.reset();
    this.weight.setErrors(null);
    this.foods.reset();
    this.foods.setErrors(null);
  }
}
