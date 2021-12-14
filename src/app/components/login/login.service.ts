import { Injectable } from "@angular/core";
import { ApiRepository } from "../../repository/api/ApiRepository";
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from "angularx-social-login";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    
    private logged : Subject<boolean> = new Subject<boolean>()
    private autoLogin
    private user : string
    
    constructor(private authService: SocialAuthService, 
        private repository : ApiRepository) {

            this.autoLogin = localStorage.getItem('autoLogin') || false
            
            // After oAuth successfully authenticated
            this.authService.authState.subscribe((user : SocialUser) => {
                
                // Success
                if (user != null) {                    
                    // Logs in the backend
                    this.login(user.idToken || user.authToken, user.provider)
                }
            });
        }
        
        async login(token, provider) : Promise<boolean> {
            
            try {
                // Login returns user's name on success
                this.user = await this.repository.login(token, provider)

                this.logged.next(true)
                this.autoLogin = true
                localStorage.setItem('autoLogin', 'true')

                return true
            } catch(e) {
                console.log('Fail to login: ' + JSON.stringify(e))
            }
            
            return false
        }
        
        waitForLogin() : Subject<boolean> {
            return this.logged
        }
        
        getLoggedUser() {
            return this.user
        }

        getAutoLogin() {
            return this.autoLogin
        }
        
        signInWithGoogle() {
            return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
        }

        signInWithFacebook() {
            return this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
        }
        
        signOut(): void {
            this.authService.signOut(true)
            this.user = undefined
            this.logged.next(false)
            this.autoLogin = false
            localStorage.removeItem('autoLogin')
        }
    }