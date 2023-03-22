import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.isLoggedIn();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.isLoggedIn();
  }

  private isLoggedIn(): Observable<boolean> {
    return this.authService.authInfo$.pipe(
      take(1),
      map((el) => el.isLoggedIn),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/home']);
        }
      })
    );
  }
}
