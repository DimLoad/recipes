import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private authService: AuthService, private router: Router) {}
  canActivate(rote: ActivatedRouteSnapshot, router: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        return !!user;
      }),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/auth']);
        }
      })
    );
  }
}