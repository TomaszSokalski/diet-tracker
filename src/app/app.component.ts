import { Component, OnInit } from '@angular/core';
import { FoodListService } from './food-list.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'diet-trucker';
  foods = this.foodService.foods;
  constructor (private foodService: FoodListService) {}

  ngOnInit(): void {
    console.log('hello');
  }

  getTitle (): string {
    return this.title; 
  }
};


