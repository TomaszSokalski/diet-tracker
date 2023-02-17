import { Component, OnInit } from '@angular/core';
import { DiaryService } from './services/diary.service';
import { DiaryState } from './state/diary.state';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
})
export class DiaryComponent implements OnInit {
  diary$ = this.diaryState.diary$;

  constructor(private diaryState: DiaryState) {}

  ngOnInit(): void {
    this.diaryState.getDiary();
  }
}
