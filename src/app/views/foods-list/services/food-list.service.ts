import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Food } from '../../../interfaces/food.interface';
import { Response } from '../../../interfaces/response.interface';

@Injectable()
export class FoodListService {
  private API_URL = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  get food() {
    return this.httpClient.get<Response>(`${this.API_URL}/foods`);
  }

  deleteFood(id: string) {
    return this.httpClient.delete<Food>(`${this.API_URL}/foods/${id}`);
  }

  getFood(id: string) {
    return this.httpClient.get<Food>(`${this.API_URL}/foods/${id}`);
  }

  postFood(food: Food) {
    return this.httpClient.post<Food>(`${this.API_URL}/foods/`, food);
  }

  updateFood(food: Food, id: string) {
    return this.httpClient.put<Food>(`${this.API_URL}/foods/${id}`, food);
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
}
