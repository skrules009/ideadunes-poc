import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take,map } from 'rxjs/operators';
import { AuthguradServiceService } from './authgurad-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private Authguardservice: AuthguradServiceService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.Authguardservice.gettoken()) {
      this.router.navigateByUrl("/Login");
    }
    return this.Authguardservice.isLoggedIn.pipe(
      take(1),                              
      map((isLoggedIn: boolean) => {         
        if (!isLoggedIn){
          this.router.navigate(['/Login']);  
          return false;
        }
        return true;
      })
    );//this.Authguardservice.gettoken();
  }
}
