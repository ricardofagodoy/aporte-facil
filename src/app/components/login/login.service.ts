import { Injectable } from "@angular/core";
import { ApiRepository } from "../../repository/api/ApiRepository";
import { SocialAuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    private readonly ID_TOKEN : string = "idToken"
    private user : string

    constructor(private authService: SocialAuthService, 
                private repository : ApiRepository,
                private router: Router) {
        
        // After oAuth successfully authenticated
        this.authService.authState.subscribe((user : SocialUser) => {

            // Success
            if (user != null) {
                
                // Stores token locally
                localStorage.setItem(this.ID_TOKEN, user.idToken)

                // Logs in the backend
                this.login().then(() => this.router.navigate(['home']))
            }
        });
    }

    async login() : Promise<boolean> {

        const token = localStorage.getItem(this.ID_TOKEN)

        // No token, login not successful
        if (token == null)
            return false

        try {
            // Login returns user's name on success
            this.user = await this.repository.login(token)
            return true
        } catch(e) {
            console.log('Fail to login: ' + JSON.stringify(e))
        }

        return false
    }

    isLoggedIn() {
        return this.user != undefined
    }

    getLoggedUser() {
        return this.user
    }
    
    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    }

    signOut(): void {
        this.authService.signOut(true)
        localStorage.removeItem(this.ID_TOKEN)
        this.user = undefined
    }
}