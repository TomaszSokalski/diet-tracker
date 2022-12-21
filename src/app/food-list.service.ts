import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from './response.interface';

@Injectable()
export class FoodListService {

  constructor(private httpClient: HttpClient) { }
  
 get foods()  {
    return this.httpClient.get<Response>(`http://localhost:8080/foods`);
  }
}
