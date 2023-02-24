import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiaryResponse } from 'src/app/interfaces/diary-response.interface';
import { Diary } from 'src/app/interfaces/diary.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private API_URL = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getDiary(): Observable<DiaryResponse> {
    return this.httpClient.get<DiaryResponse>(`${this.API_URL}/diary`);
  }

  getDiaryById(id: string): Observable<Diary> {
    return this.httpClient.get<Diary>(`${this.API_URL}/diary/${id}`);
  }

  getDiaryByDate(searchBy?: string): Observable<DiaryResponse> {
    let params;

    if (searchBy) {
      params = new HttpParams({ fromString: `data=${searchBy}` });
    }
    return this.httpClient.get<DiaryResponse>(`${this.API_URL}/diary`, {
      params: params,
    });
  }

  postFoodToDiary(food: Diary): Observable<Diary> {
    return this.httpClient.post<Diary>(`${this.API_URL}/diary`, food);
  }

  deleteDiary(id: string): Observable<Diary> {
    return this.httpClient.delete<Diary>(`${this.API_URL}/diary/${id}`);
  }
}
