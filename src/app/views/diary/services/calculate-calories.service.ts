import { Injectable } from '@angular/core';
import { Diary } from '@app/views/diary/interfaces/diary.interface';
import { Food } from '@app/views/foods-list/interfaces/food.interface';

@Injectable({
  providedIn: 'root',
})
export class CalculateCaloriesService {
  calculateTotalCalories(diary: Diary[] | null, food: Food[] | null): number {
    const foodsInDiary = diary!.map((el) => el.foods).flat();
    const getCompareFoods = food!.filter(({ id: id1 }) =>
      foodsInDiary!.some(({ id: id2 }) => id1 === id2)
    );
    const totalCaloriesPerDay = getCompareFoods.reduce(
      (acc, food) => acc + food.caloriesPer100g!,
      0
    );
    const totalWeightPerDay = foodsInDiary!.reduce(
      (acc, food) => acc + food.weight,
      0
    );

    return (totalWeightPerDay / 100) * totalCaloriesPerDay;
  }

  calculateTotalWeight(diary: Diary[] | null): number {
    const foods = diary?.map((el) => el.foods);
    return foods!.flat().reduce((acc, food) => acc + food.weight, 0);
  }
}
