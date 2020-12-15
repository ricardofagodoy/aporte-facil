import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService : LoginService) {}

  ngOnInit(): void {}
  
  signInWithGoogle(): void {
    this.loginService.signInWithGoogle()
  }

  signOut(): void {
    this.loginService.signOut()
  }
}