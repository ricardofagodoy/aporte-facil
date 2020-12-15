import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationGuard implements CanActivate {

    constructor(private loginService : LoginService, private router: Router) {}
    
    async canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<boolean> {

        //  Logged In
        if (this.loginService.isLoggedIn())
            return true;

        // Not logged in, do it
        if (!await this.loginService.login())
          return this.router.navigate(['login']) 
        
        return true
    }
  }