import { Component } from '@angular/core';
import { FoodListService } from './food-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  response$ = this.foodService.foods;
  title = 'diet-trucker';

  constructor (private foodService: FoodListService) {}

  getTitle (): string {
    return this.title; 
  }
};


