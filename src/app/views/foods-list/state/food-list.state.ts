import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Food } from '@views/foods-list/interfaces/food.interface';
import { FoodListService } from '@views/foods-list/services/food-list.service';
import { TagsService } from '@views/foods-list/services/tags.service';
import { Tag } from '@views/foods-list/interfaces/tag.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FoodListState {
  private foodsSource = new BehaviorSubject<Food[]>([]);
  foods$ = this.foodsSource.asObservable();

  private foodSource = new BehaviorSubject<Food>({} as Food);
  food$ = this.foodSource.asObservable();

  private tagsSource = new BehaviorSubject<Tag[]>([]);
  tags$ = this.tagsSource.asObservable();

  private loadingSource = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSource.asObservable();

  private errorSource = new BehaviorSubject<Error | null>(null);
  error$ = this.errorSource.asObservable();

  constructor(
    private foodService: FoodListService,
    private tagsService: TagsService,
    private snackBar: MatSnackBar
  ) {}

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
      next: () => {
        this.errorSource.next(null);
      },
      error: (error) => {
        this.errorSource.next(error);
      },
      complete: () => {
        this.snackBar.open('Updated food successfully');
        this.updateLoading(false);
      },
    });
  }

  searchFoods(searchBy?: string, tags?: Tag['id'][]): void {
    this.updateLoading(true);

    this.foodService.searchFoods(searchBy, tags).subscribe({
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

  getTags(): void {
    this.updateLoading(true);

    this.tagsService.getTags().subscribe({
      next: (response) => {
        this.errorSource.next(null);
        this.tagsSource.next(response.data);
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
      next: () => {
        this.errorSource.next(null);
      },
      error: (error) => {
        this.errorSource.next(error);
      },
      complete: () => {
        this.updateLoading(false);
        this.snackBar.open('Added food successfully');
      },
    });
  }

  deleteFood(id: string): void {
    this.updateLoading(true);

    this.foodService.deleteFood(id).subscribe({
      next: (message) => {
        this.errorSource.next(null);
        this.getFoods();
        this.snackBar.open(Object.values(message)[0]);
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
