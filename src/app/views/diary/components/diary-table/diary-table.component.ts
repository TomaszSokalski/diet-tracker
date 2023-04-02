import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { filter, takeUntil } from 'rxjs';

import { Diary } from '@views/diary/interfaces/diary.interface';
import { Food } from '@views/foods-list/interfaces/food.interface';
import { UnsubscribeComponent } from '@shared/unsubscribe';
import { FoodListState } from '@views/foods-list/state/food-list.state';
import { DiaryState } from '../../state/diary.state';
import { CalculateCaloriesService } from '@views/diary/services/calculate-calories.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { DISPLAYED_COLUMNS } from './displayed-columns.const';

@Component({
  selector: 'app-diary-table',
  templateUrl: './diary-table.component.html',
  styleUrls: ['./diary-table.component.scss'],
})
export class DiaryTableComponent
  extends UnsubscribeComponent
  implements OnInit
{
  displayedColumns = DISPLAYED_COLUMNS;

  foods$ = this.foodListState.foods$;
  diary$ = this.diaryState.diary$;
  loading$ = this.diaryState.loading$;
  error$ = this.diaryState.error$;

  constructor(
    private diaryState: DiaryState,
    private foodListState: FoodListState,
    private datePipe: DatePipe,
    private snackbar: MatSnackBar,
    private calcCalories: CalculateCaloriesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getInitialValue();
    this.listenToErrors();
  }

  deleteFoodInDiary(diary: Diary): void {
    this.diaryState.deleteDiary(diary.id, diary.date);
  }

  totalCalories(diary: Diary[] | null, food: Food[] | null) {
    return this.calcCalories.calculateTotalCalories(diary, food);
  }

  totalWeight(diary: Diary[] | null): number {
    return this.calcCalories.calculateTotalWeight(diary);
  }

  private getInitialValue(): void {
    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.diaryState.getDiary(date!);
  }

  private listenToErrors() {
    this.error$
      .pipe(
        takeUntil(this.destroy$),
        filter((error) => error !== null)
      )
      .subscribe((error) => {
        this.snackbar.open(error?.message ?? 'Error');
      });
  }
}
