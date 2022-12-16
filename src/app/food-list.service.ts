import { Injectable } from '@angular/core';
import { Food } from './food.interface';

@Injectable()
export class FoodListService {
private _foods: Food[]  = [
  {
    id: 1,
    name: 'Broccoli',
    weight: 1.5
  },
  {
    id: 2,
    name: 'Orange',
    weight: 2
  },
]
  constructor() { }

 get foods(): Food[] {
    return this._foods;
  }
}
