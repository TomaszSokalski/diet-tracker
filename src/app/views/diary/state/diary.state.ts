import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Diary } from "src/app/interfaces/diary.interface";
import { DiaryService } from "../services/diary.service";


@Injectable({
  providedIn: 'root',
})
export class DiaryState {
  private diarySource = new BehaviorSubject<Diary[]>([]);
  diary$ = this.diarySource.asObservable();

  private loadingSource = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSource.asObservable();

  constructor(private diaryService: DiaryService) {}

  getDiary(): void {
    this.updateLoading(true);

    this.diaryService.getDiary().subscribe({
      next: (diary) => {
        this.diarySource.next(diary);
      },
      complete: () => {
        this.updateLoading(false);
      },
    });
  }

  private updateLoading(value: boolean): void {
    this.loadingSource.next(value);
  }
}