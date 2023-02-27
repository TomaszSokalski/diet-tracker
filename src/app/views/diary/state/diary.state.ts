import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, finalize } from 'rxjs';
import { DiaryResponse } from 'src/app/interfaces/diary-response.interface';
import { Diary } from 'src/app/interfaces/diary.interface';
import { DiaryService } from '../services/diary.service';

@Injectable({
  providedIn: 'root',
})
export class DiaryState {
  private diarySource = new BehaviorSubject<Diary[]>([]);
  diary$ = this.diarySource.asObservable();

  private loadingSource = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSource.asObservable();

  constructor(
    private diaryService: DiaryService,
    private snackbar: MatSnackBar
  ) {}

  getDiary(date?: string): void {
    this.updateLoading(true);
    const observer = {
      next: (response: DiaryResponse) => {
        this.diarySource.next(response.data);
      },
      error: (error: Error) => {
        this.snackbar.open(error.message);
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
    this.diaryService
      .deleteDiary(id)
      .pipe(
        finalize(() => {
          this.updateLoading(true);
        })
      )
      .subscribe({
        next: () => {
          this.getDiary(date);
        },
        error: (error) => {
          this.snackbar.open(error.message);
        },
        complete: () => {
          this.snackbar.open('Food Deleted', '', {
            duration: 2000,
          });
        },
      });
  }

  private updateLoading(value: boolean): void {
    this.loadingSource.next(value);
  }
}
