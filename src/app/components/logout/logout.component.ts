import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent implements OnInit {

  constructor(private loginService : LoginService, private router : Router) {}

  ngOnInit(): void {
    this.loginService.signOut()
    this.router.navigate(['login'])
  }
}