import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '../interfaces/response.interface';
import { Food } from '../interfaces/food.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class FoodListService {
  constructor(private httpClient: HttpClient) {}

  private API_URL = environment.baseUrl;

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
      // tworzymy paramsy
      params = new HttpParams({ fromString: `name=${searchBy}` });
    }
    // strzał z paramsami albo bez
    return this.httpClient.get<Response>(`${this.API_URL}/foods`, { params: params });
  }
}
