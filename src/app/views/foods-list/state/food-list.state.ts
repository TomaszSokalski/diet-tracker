import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

import { Food } from '@views/foods-list/interfaces/food.interface';
import { FoodListService } from '../services/food-list.service';

@Injectable({
  providedIn: 'root',
})
export class FoodListState {
  private foodsSource = new BehaviorSubject<Food[]>([]);
  foods$ = this.foodsSource.asObservable();

  private foodSource = new BehaviorSubject<Food>({} as Food);
  food$ = this.foodSource.asObservable();

  private updatedFoodSource = new BehaviorSubject<Food>({} as Food);
  updatedFood$ = this.updatedFoodSource.asObservable();

  private postFoodSource = new BehaviorSubject<Food>({} as Food);
  postFood$ = this.postFoodSource.asObservable();

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
        this.foodsSource.next(response.data);
      },
      error: (error) => {
        this.errorSource.next(error);
      },
      complete: () => {
        this.updateLoading(false);
      },
    });
  }

  getFoodById(id: string): void {
    this.updateLoading(true);

    this.foodService.getFood(id).subscribe({
      next: (response) => {
        this.errorSource.next(null);
        this.foodSource.next(response);
      },
      error: (error) => {
        this.errorSource.next(error);
      },
      complete: () => {
        this.updateLoading(false);
      },
    });
  }

  updateFood(food: Food, id: string): void {
    this.updateLoading(true);

    this.foodService.updateFood(food, id).subscribe({
      next: (response) => {
        this.errorSource.next(null);
        this.updatedFoodSource.next(response);
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
      .subscribe({
        next: (response) => {
          this.errorSource.next(null);
          this.foodsSource.next(response.data);
        },
        error: (error) => {
          this.errorSource.next(error);
        },
        complete: () => {
          this.updateLoading(false);
        },
      });
  }

  postFood(food: Food): void {
    this.updateLoading(true);

    this.foodService.postFood(food).subscribe({
      next: (response) => {
        this.errorSource.next(null);
        this.postFoodSource.next(response);
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
    this.updateLoading(true);

    this.foodService.deleteFood(id).subscribe({
      next: () => {
        this.errorSource.next(null);
        this.getFoods();
      },
      error: (error) => {
        this.errorSource.next(error);
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
