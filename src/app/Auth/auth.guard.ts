import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // constructor for inject service
  constructor(private api: ApiService, private route: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('isLoggedIn') == 'true') {
      return true;
    }
    else {
      this.route.navigate(['auth/login-template']);
      return false;
    }

  }

}
