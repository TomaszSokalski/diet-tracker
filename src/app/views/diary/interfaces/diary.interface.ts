import { Food } from '../../foods-list/interfaces/food.interface';

export interface Diary {
  id: string;
  foods: Food[];
  date: string;
}

export interface DiaryPayload {
  id: string;
  food: Food;
  date: string;
}
