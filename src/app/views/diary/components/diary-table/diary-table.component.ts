import { Component, Input, OnInit } from '@angular/core';
import { Diary } from 'src/app/interfaces/diary.interface';
import { DISPLAYED_COLUMNS } from '../../displayed-columns.const';
import { DiaryService } from '../../services/diary.service';

@Component({
  selector: 'app-diary-table',
  templateUrl: './diary-table.component.html',
  styleUrls: ['./diary-table.component.scss'],
})
export class DiaryTableComponent implements OnInit {
  displayedColumns = DISPLAYED_COLUMNS;
  @Input() diaries: Diary[] | null = null;

  constructor(private diaryService: DiaryService) {}

  ngOnInit(): void {
  }

  deleteFoodInDiary(id: string): void {
    this.diaryService.deleteFoodinDiaryById(id);
  }
}
