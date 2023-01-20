import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../interfaces/response.interface';
import { Food } from '../interfaces/food.interface';

@Injectable()
export class FoodListService {
  constructor(private httpClient: HttpClient) {}

  private API_URL = 'http://localhost:8080/api';

  get food() {
    return this.httpClient.get<Response>(`${this.API_URL}/foods`);
  }

  deleteFood(id: string) {
    return this.httpClient.delete(`${this.API_URL}/foods/${id}`);
  }

  getFood(id: string) {
    return this.httpClient.get<Food>(`${this.API_URL}/foods/${id}`);
  }

  postFood(food: any) {
    return this.httpClient.post(`${this.API_URL}/foods/`, food);
  }

  updateFood(food: any, id: string) {
    return this.httpClient.put<Food>(`${this.API_URL}/foods/${id}`, food);
  }
}
