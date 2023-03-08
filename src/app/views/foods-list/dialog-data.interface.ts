import { Food } from "src/app/interfaces/food.interface";

export interface DialogData {
    food: Food;
    id: string,
    isReadonly: boolean,
}