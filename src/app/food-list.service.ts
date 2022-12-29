import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from './response.interface';
import { Food } from './food.interface'

@Injectable()
export class FoodListService {

  constructor(private httpClient: HttpClient) { }

  private API_URL = 'http://localhost:8080/api';

 get foods()  {
    return this.httpClient.get<Response>(`${this.API_URL}/foods`);
  }

  onDelete(id: number) {
    return this.httpClient.delete(`${this.API_URL}/foods/${id}`)
  }

  onGetItem(id: number) {
    return this.httpClient.get<Food>(`${this.API_URL}/foods/${id}`)
  }
}

