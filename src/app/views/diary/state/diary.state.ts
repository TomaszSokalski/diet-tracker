import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';

import { DiaryResponse } from '@app/views/diary/interfaces/diary-response.interface';
import { Diary } from '@app/views/diary/interfaces/diary.interface';
import { DiaryService } from '../services/diary.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class DiaryState {
  private diarySource = new BehaviorSubject<Diary[]>([]);
  diary$ = this.diarySource.asObservable();

  private loadingSource = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSource.asObservable();

  private errorSource = new BehaviorSubject<Error | null>(null);
  error$ = this.errorSource.asObservable();

  constructor(private diaryService: DiaryService, private snackBar: MatSnackBar) {}

  getDiary(date?: string): void {
    this.updateLoading(true);
    const observer = {
      next: (response: DiaryResponse) => {
        this.diarySource.next(response.data);
        this.errorSource.next(null);
      },
      error: (error: Error) => {
        this.errorSource.next(error);
      },
      complete: () => {
        this.updateLoading(false);
      },
    };

    date
      ? this.diaryService.getDiaryByDate(date).subscribe(observer)
      : this.diaryService.getDiary().subscribe(observer);
  }

  deleteDiary(id: string, date: string): void {
    this.updateLoading(true);
    this.diaryService
      .deleteDiary(id)
      .pipe(
        finalize(() => {
          this.updateLoading(false);
        })
      )
      .subscribe({
        next: (message) => {
          this.getDiary(date);
          console.log(message);
          this.snackBar.open(Object.values(message)[0]);
        },
        error: (error: Error) => {
          this.errorSource.next(error);
        }
      });
  }

  private updateLoading(value: boolean): void {
    this.loadingSource.next(value);
  }
}
