import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationGuard implements CanActivate {

    constructor(private loginService : LoginService, private router: Router) {}
    
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {

        console.log('guard')

        // Should be automatic login?
        if (!this.loginService.getAutoLogin()) {
          this.router.navigate(['/login'])
          return of(false)
        }

        // Already authenticated?
        if (this.loginService.getLoggedUser())
          return of(true)

        // Then wait for auth!
        return this.loginService.waitForLogin()
    }
  }