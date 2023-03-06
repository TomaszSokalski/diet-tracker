import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { Diary } from 'src/app/interfaces/diary.interface';

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
  error$ = this.diaryState.error$;

  constructor(private diaryState: DiaryState, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getInitialValue();
    this.listenToErrors();
  }

  deleteFoodInDiary(diary: Diary): void {
    this.diaryState.deleteDiary(diary.id, diary.date);
  }

  private getInitialValue(): void {
    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.diaryState.getDiary(date!);
  }

  private listenToErrors() {
    this.error$.pipe(filter((v) => v !== null)).subscribe((err) => {
      this.snackbar.open(err?.message ?? 'Error');
    });
  }
  // update take until
}
