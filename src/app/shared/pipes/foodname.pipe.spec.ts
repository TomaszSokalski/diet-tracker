import { Food } from '@app/views/foods-list/interfaces/food.interface';
import { Observable, of } from 'rxjs';
import { FoodnamePipe } from './foodname.pipe';

describe('FoodnamePipe', () => {
  const foods$: Observable<Food[]> = of([
    { id: '1', name: 'Bill', weight: 20 },
  ]);
  it('create an instance', () => {
    const pipe = new FoodnamePipe();
    expect(pipe).toBeTruthy();
  });
  it('maps value', () => {
    const pipe = new FoodnamePipe();
    expect(pipe.transform('1', foods$)).toBe('Bill');
  });
});
