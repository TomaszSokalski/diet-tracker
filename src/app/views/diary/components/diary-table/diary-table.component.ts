import { Component, OnInit } from '@angular/core';

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

  constructor(private diaryState: DiaryState) {}

  ngOnInit(): void {
  }

  deleteFoodInDiary(id: string): void {
    this.diaryState.deleteDiary(id);
  }
}
