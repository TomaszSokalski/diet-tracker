import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { API_URL } from '@shared/utils/api/config.const';
import { TagsResponse } from '../interfaces/tags-response';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private BASE_PATH = '/dicts/tags';

  constructor(private httpClient: HttpClient) {}

  getTags(): Observable<TagsResponse> {
    return this.httpClient.get<TagsResponse>(`${API_URL}${this.BASE_PATH}`);
  }
}