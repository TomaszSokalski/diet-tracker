import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, take } from 'rxjs';
import { DiaryResponse } from 'src/app/interfaces/diary-response.interface';
import { Food } from 'src/app/interfaces/food.interface';
import { FoodListService } from '../services/food-list.service';

@Injectable({
  providedIn: 'root',
})
export class FoodListState {
  private foodSource = new BehaviorSubject<Food[]>([]);
  food$ = this.foodSource.asObservable();

  private loadingSource = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSource.asObservable();

  private errorSource = new BehaviorSubject<Error | null>(null);
  error$ = this.errorSource.asObservable();

  constructor(private foodService: FoodListService) {}

  getFoods(): void {
    this.updateLoading(true);

    this.foodService.food.subscribe({
      next: (response) => {
        this.errorSource.next(null);
        this.foodSource.next(response.data);
      },
      error: (error) => {
        this.errorSource.next(error);
      },
      complete: () => {
        this.updateLoading(false);
      },
    });
  }

  searchFoods(searchBy?: string): void {
    this.updateLoading(true);

    this.foodService
      .searchFoods(searchBy)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.errorSource.next(null);
          this.foodSource.next(response.data);
        },
        error: (error) => {
          this.errorSource.next(error);
        },
        complete: () => {
          this.updateLoading(false);
        },
      });
  }

  deleteFood(id: string): void {
    this.foodService
      .deleteFood(id)
      .pipe(
        finalize(() => {
          this.updateLoading(true);
        })
      )
      .subscribe({
        next: () => {
          this.getFoods();
        },
        error: (error) => {
          this.errorSource.next(error);
        },
      });
  }

  private updateLoading(value: boolean): void {
    this.loadingSource.next(value);
  }
}
