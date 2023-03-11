import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Diary } from '@app/interfaces/diary.interface';
import { Food } from '@app/interfaces/food.interface';
import { UnsubscribeComponent } from '@app/shared/utils/unsubscribe';
import { FoodListState } from '@app/views/foods-list/state/food-list.state';
import { FoodnamePipe } from '@shared/pipes/foodname.pipe';
import { filter, takeUntil } from 'rxjs';
import { DISPLAYED_COLUMNS } from '../../displayed-columns.const';
import { DiaryState } from '../../state/diary.state';

@Component({
  selector: 'app-diary-table',
  templateUrl: './diary-table.component.html',
  styleUrls: ['./diary-table.component.scss'],
  providers: [FoodnamePipe],
})
export class DiaryTableComponent
  extends UnsubscribeComponent
  implements OnInit
{
  displayedColumns = DISPLAYED_COLUMNS;

  foods$ = this.foodListState.food$;
  diary$ = this.diaryState.diary$;
  loading$ = this.diaryState.loading$;
  error$ = this.diaryState.error$;

  constructor(
    private diaryState: DiaryState,
    private foodListState: FoodListState,
    private datePipe: DatePipe,
    private snackbar: MatSnackBar
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

  calculateTotalCalories(diary: Diary[] | null, food: Food[] | null): number {
    const foodsInDiary = diary!.map((el) => el.foods).flat();
    const getCompareFoods = food!.filter(({ id: id1 }) =>
      foodsInDiary!.some(({ id: id2 }) => id1 === id2)
    );
    const totalCaloriesPerDay = getCompareFoods.reduce(
      (acc, food) => acc + food.caloriesPer100g!,
      0
    );
    const totalWeightPerDay = foodsInDiary!.reduce(
      (acc, food) => acc + food.weight,
      0
    );

    return (totalWeightPerDay / 100) * totalCaloriesPerDay;
  }

  calculateTotalWeight(diary: Diary[] | null): number {
    const foods = diary?.map((el) => el.foods);
    return foods!.flat().reduce((acc, food) => acc + food.weight, 0);
  }

  private getInitialValue(): void {
    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.diaryState.getDiary(date!);
  }

  private listenToErrors() {
    this.error$
      .pipe(
        takeUntil(this.destroy$),
        filter((e) => e !== null)
      )
      .subscribe((err) => {
        this.snackbar.open(err?.message ?? 'Error');
      });
  }
}
