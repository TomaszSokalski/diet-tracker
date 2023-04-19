import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Login } from '../login/login.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private postUserSource = new BehaviorSubject<Login>({} as Login);
  postUser$ = this.postUserSource.asObservable();

  private loadingSource = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSource.asObservable();

  private errorSource = new BehaviorSubject<Error | null>(null);
  error$ = this.errorSource.asObservable();

  constructor(private authService: AuthService) {}

  postUser(user: Login): void {
    this.updateLoading(true);

    this.authService.postUser(user).subscribe({
      next: (response) => {
        this.errorSource.next(null);
        this.postUserSource.next(response);
      },
      error: (error) => {
        this.errorSource.next(error);
      },
      complete: () => {
        this.updateLoading(false);
      },
    });
  }

  private updateLoading(value: boolean): void {
    this.loadingSource.next(value);
  }
}