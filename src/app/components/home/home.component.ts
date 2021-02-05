import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private loginService : LoginService, private router : Router) {}

  ngOnInit(): void {
    this.loginService.waitForLogin().subscribe(() => {
      this.router.navigate(['/carteira'])
    })
  }

  navigateTo(path) {
    this.router.navigate([path])
  }
}