import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { API_URL } from '@shared/utils/api/config.const';
import { TagsResponse } from '../interfaces/tags-response';
import { Tag } from '../interfaces/tag.interface';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private BASE_PATH = '/dicts/tags';

  constructor(private httpClient: HttpClient) {}

  getTags(): Observable<TagsResponse> {
    const tags: Tag[] = [
    { id: 1, name: 'lactoseFree' },
    { id: 2, name: 'alergen' },
    { id: 3, name: 'keto' },
  ];
    const tagResponse: TagsResponse = {data: tags, length: tags.length}
    return of(tagResponse);
    // return this.httpClient.get<TagsResponse>(`${API_URL}${this.BASE_PATH}`);
  }
}