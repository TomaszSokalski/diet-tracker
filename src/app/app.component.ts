import { Component } from '@angular/core';
import { FoodListService } from './food-list.service';
import { Food } from './food.interface';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  response$ = this.foodService.foods;
  title = 'diet-trucker';
  selectedFood$: Observable<Food>;
  isLoading = false;

  constructor (private foodService: FoodListService) {}

  getTitle (): string {
    return this.title; 
  }

  onDetails (id: number) {
    this.selectedFood$ = this.foodService.onGetItem(id)
  }

  onDelete (id: number) {
    this.isLoading = true;
    this.foodService.onDelete(id).pipe(finalize(() => {
      this.isLoading = false
    })).subscribe(() => {
      this.response$ = this.foodService.foods;
    })
  }
}


