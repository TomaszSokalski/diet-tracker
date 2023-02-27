import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Diary } from 'src/app/interfaces/diary.interface';

import { DISPLAYED_COLUMNS } from '../../displayed-columns.const';
import { DiaryState } from '../../state/diary.state';

@Component({
  selector: 'app-diary-table',
  templateUrl: './diary-table.component.html',
  styleUrls: ['./diary-table.component.scss'],
})
export class DiaryTableComponent implements OnInit {
  displayedColumns = DISPLAYED_COLUMNS;

  diary$ = this.diaryState.diary$;
  loading$ = this.diaryState.loading$;

  constructor(private diaryState: DiaryState, private datePipe: DatePipe) {}

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
