import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Food } from '@shared/interfaces/food.interface';

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
