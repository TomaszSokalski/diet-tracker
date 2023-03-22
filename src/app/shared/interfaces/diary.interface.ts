import { Food } from "./food.interface";

export interface Diary {
  id: string;
  foods: Food[];
  date: string;
}