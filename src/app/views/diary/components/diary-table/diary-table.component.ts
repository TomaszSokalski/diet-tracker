import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Diary } from 'src/app/interfaces/diary.interface';
import { FoodnamePipe } from 'src/app/shared/pipes/foodname.pipe';
import { FoodListState } from 'src/app/views/foods-list/state/food-list.state';

import { DISPLAYED_COLUMNS } from '../../displayed-columns.const';
import { DiaryState } from '../../state/diary.state';

@Component({
  selector: 'app-diary-table',
  templateUrl: './diary-table.component.html',
  styleUrls: ['./diary-table.component.scss'],
  providers: [FoodnamePipe],
})
export class DiaryTableComponent implements OnInit {
  displayedColumns = DISPLAYED_COLUMNS;

  foods$ = this.foodListState.food$;
  diary$ = this.diaryState.diary$;
  loading$ = this.diaryState.loading$;

  constructor(
    private diaryState: DiaryState,
    private foodListState: FoodListState,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.getInitialValue();
  }

  deleteFoodInDiary(diary: Diary): void {
    this.diaryState.deleteDiary(diary.id, diary.date);
  }

  private getInitialValue(): void {
    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.diaryState.getDiary(date!);
  }
}
