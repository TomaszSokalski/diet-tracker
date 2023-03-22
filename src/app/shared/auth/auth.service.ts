import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthInfo } from './auth-info.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authInfo$: Observable<AuthInfo> = of({
    isLoggedIn: false,
  });
}
