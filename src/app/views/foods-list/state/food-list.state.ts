import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, take } from 'rxjs';
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

  constructor(private foodService: FoodListService) {}

  getFoods(): void {
    this.updateLoading(true);

    this.foodService.food.subscribe({
      next: (response) => {
        this.foodSource.next(response.data);
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
          this.foodSource.next(response.data);
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
      .subscribe(() => {
        this.getFoods();
      });
  }

  private updateLoading(value: boolean): void {
    this.loadingSource.next(value);
  }
}
