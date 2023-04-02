import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_URL } from '../utils/api/config.const';
import { AuthInfo } from './auth-info.interface';
import { Login } from './components/login/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_PATH = '/user';
  authInfo$: Observable<AuthInfo> = of({
    isLoggedIn: false,
  });

  constructor(private httpClient: HttpClient) {}

  getUserByPassword(password: string): Observable<Login> {
    return this.httpClient.get<Login>(
      `${API_URL}${this.BASE_PATH}/${password}`
    );
  }

  postUser(login: Login): Observable<Login> {
    return this.httpClient.post<Login>(`${API_URL}${this.BASE_PATH}`, login);
  }
}
