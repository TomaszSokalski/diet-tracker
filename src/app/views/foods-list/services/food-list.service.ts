import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '@shared/utils/api/config.const';
import { Food } from '@views/foods-list/interfaces/food.interface';
import { FoodResponse } from '../interfaces/food-response.interface';

@Injectable({
  providedIn: 'root',
})
export class FoodListService {
  private BASE_PATH = '/foods';

  constructor(private httpClient: HttpClient) {}

  get food(): Observable<FoodResponse> {
    return this.httpClient.get<FoodResponse>(`${API_URL}${this.BASE_PATH}`);
  }

  getFood(id: string): Observable<Food> {
    return this.httpClient.get<Food>(`${API_URL}${this.BASE_PATH}/${id}`);
  }

  searchFoods(searchBy?: string): Observable<FoodResponse> {
    let params;

    if (searchBy) {
      params = new HttpParams({ fromString: `name=${searchBy}` });
    }
    return this.httpClient.get<FoodResponse>(`${API_URL}${this.BASE_PATH}`, {
      params: params,
    });
  }

  postFood(food: Food): Observable<Food> {
    return this.httpClient.post<Food>(`${API_URL}${this.BASE_PATH}`, food);
  }

  updateFood(food: Food, id: string): Observable<Food> {
    return this.httpClient.put<Food>(`${API_URL}${this.BASE_PATH}/${id}`, food);
  }

  deleteFood(id: string): Observable<Food> {
    return this.httpClient.delete<Food>(`${API_URL}${this.BASE_PATH}/${id}`);
  }
}
