import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from "@angular/router";
import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {
  
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  
  public name : string = "Aporte Fácil"

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, 
              private router : Router,
              public loginService : LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  navigateTo(path) {
    this.router.navigate([path])
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}