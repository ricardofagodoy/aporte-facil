import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading : boolean = true

  constructor(private loginService : LoginService, private router : Router) {}

  ngOnInit(): void {
    
     this.loginService.waitForLogin().subscribe(() => {
       this.router.navigate(['/carteira'])
     })

    // Show button after tried to login
    setTimeout(() => {
      this.loading = false
    }, 2000)
  }
  
  signInWithGoogle(): void {
    this.loginService.signInWithGoogle()
  }

  signOut(): void {
    this.loginService.signOut()
  }
}