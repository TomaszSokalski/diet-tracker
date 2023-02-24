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
    foodId: ['', [Validators.required]],
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
      this.diaryService.getDiary();
    });
  }

  onDateChange(event: MatDatepickerInputEvent<string>): void {
    const transformedData = this.datePipe.transform(event.value, 'yyyy-MM-dd');

    this.diaryState.getDiary(transformedData!);
  }

  private diaryPayload(diaryForm: FormGroup): Diary {
    const date = this.date;
    const formattedDate = this.datePipe.transform(date.value, 'yyyy-MM-dd');
    const { value } = diaryForm;
    return {
      id: value.id,
      date: formattedDate!,
      foodIds: value.foodId,
    };
  }
}
