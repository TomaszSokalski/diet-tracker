import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Diary } from 'src/app/interfaces/diary.interface';
import { FoodListState } from 'src/app/views/foods-list/state/food-list.state';
import { DiaryService } from '../../services/diary.service';

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
    private diaryService: DiaryService
  ) {}

  ngOnInit(): void {
    this.foodListState.getFoods();
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

  private diaryPayload(diaryForm: FormGroup): Diary {
    const { value } = diaryForm;
    return {
      id: value.id,
      date: value.date,
      foodIds: value.foodId,
    };
  }
}
