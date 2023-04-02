import { Pipe, PipeTransform } from '@angular/core';
import { Food } from '@views/foods-list/interfaces/food.interface';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'foodName',
})
export class FoodnamePipe implements PipeTransform {
  transform(
    value: string,
    foods$: Observable<Food[]>
  ): Observable<string | undefined> {
    return foods$.pipe(map((item) => item.find((el) => el.id === value)?.name));
  }
}
