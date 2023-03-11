import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '@app/interfaces/food.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodListService {
  private API_URL = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  get food(): Observable<Response> {
    return this.httpClient.get<Response>(`${this.API_URL}/foods`);
  }

  getFood(id: string): Observable<Food> {
    return this.httpClient.get<Food>(`${this.API_URL}/foods/${id}`);
  }

  searchFoods(searchBy?: string): Observable<Response> {
    let params;

    if (searchBy) {
      params = new HttpParams({ fromString: `name=${searchBy}` });
    }
    return this.httpClient.get<Response>(`${this.API_URL}/foods`, {
      params: params,
    });
  }

  postFood(food: Food): Observable<Food> {
    return this.httpClient.post<Food>(`${this.API_URL}/foods/`, food);
  }

  updateFood(food: Food, id: string): Observable<Food> {
    return this.httpClient.put<Food>(`${this.API_URL}/foods/${id}`, food);
  }

  deleteFood(id: string): Observable<Food> {
    return this.httpClient.delete<Food>(`${this.API_URL}/foods/${id}`);
  }
}
