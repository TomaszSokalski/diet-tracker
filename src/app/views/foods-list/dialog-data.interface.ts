import { Food } from '@interfaces/food.interface';

export interface DialogData {
  food: Food;
  id: string;
  isReadonly: boolean;
}
