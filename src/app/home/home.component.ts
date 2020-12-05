import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name : string = 'Ricardo'
  value : string = 'R$ 1234,56'

  constructor() { }

  ngOnInit(): void {
  }

}
