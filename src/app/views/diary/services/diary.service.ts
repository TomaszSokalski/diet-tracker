import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DiaryResponse } from 'src/app/interfaces/diary-response.interface';
import { Diary } from 'src/app/interfaces/diary.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private API_URL = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getDiary() {
    return this.httpClient
      .get<DiaryResponse>(`${this.API_URL}/diary`)
      .pipe<Diary[]>(map((diary) => diary.data));
  }

  getDiaryById(id: string) {
    return this.httpClient.get<Diary>(`${this.API_URL}/diary/${id}`);
  }

  postFoodToDiary(food: Diary) {
    return this.httpClient.post<Diary>(`${this.API_URL}/diary`, food);
  }

  deleteFoodinDiaryById(id: string) {
    return this.httpClient.delete<Diary>(`${this.API_URL}/foods/${id}`);
  }
}
