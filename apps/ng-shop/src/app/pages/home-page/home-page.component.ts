import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-shop-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  // constructor() {}

  ngOnInit(): void {
    console.log('hello');
  }
}
