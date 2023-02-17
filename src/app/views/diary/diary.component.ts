import { Component, OnInit } from '@angular/core';
import { DiaryService } from './services/diary.service';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
})
export class DiaryComponent implements OnInit {
  diary$ = this.diaryService.getDiary();

  constructor(private diaryService: DiaryService) {}

  ngOnInit(): void {}
}
