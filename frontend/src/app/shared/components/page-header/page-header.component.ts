import { Component, Input } from '@angular/core';

@Component({
  selector: 'myshop-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  constructor() { }

  ngOnInit() {
  }
	
	@Input()
	header: string = null;
}
