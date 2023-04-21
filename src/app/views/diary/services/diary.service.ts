import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '@shared/utils/api/config.const';
import { DiaryResponse } from '@views/diary/interfaces/diary-response.interface';
import { Diary, DiaryPayload } from '@views/diary/interfaces/diary.interface';

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private BASE_PATH = '/diary';

  constructor(private httpClient: HttpClient) {}

  getDiary(): Observable<DiaryResponse> {
    return this.httpClient.get<DiaryResponse>(`${API_URL}${this.BASE_PATH}`);
  }

  getDiaryById(id: string): Observable<Diary> {
    return this.httpClient.get<Diary>(`${API_URL}${this.BASE_PATH}${id}`);
  }

  getDiaryByDate(searchBy?: string): Observable<DiaryResponse> {
    let params;

    if (searchBy) {
      params = new HttpParams({ fromString: `data=${searchBy}` });
    }
    return this.httpClient.get<DiaryResponse>(`${API_URL}${this.BASE_PATH}`, {
      params: params,
    });
  }

  postFoodToDiary(food: DiaryPayload): Observable<Diary> {
    return this.httpClient.post<Diary>(`${API_URL}${this.BASE_PATH}`, food);
  }

  deleteDiary(id: string): Observable<Diary> {
    return this.httpClient.delete<Diary>(`${API_URL}${this.BASE_PATH}/${id}`);
  }
}
