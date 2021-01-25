import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService, private router : Router) {}

  ngOnInit(): void {
    this.loginService.waitForLogin().subscribe(() => {
      this.router.navigate(['/carteira'])
    })
  }
  
  signInWithGoogle(): void {
    this.loginService.signInWithGoogle()
  }

  signOut(): void {
    this.loginService.signOut()
  }
}