import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shop-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  }

  showModal() {
	  alert('hi');
  }
}
