import {MediaMatcher} from '@angular/cdk/layout';
import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {
  
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  
  public name : string = "Aporte Fácil"

  public options = [
    {
      title: 'Minha carteira',
      route: '/home',
      icon: 'pie_chart'
    },
    {
      title: 'Quem somos?',
      route: '/sobre',
      icon: 'emoji_people'
    },
    {
      title: 'Fazer logout',
      route: '/logout',
      icon: 'exit_to_app'
    }
  ]
  
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}