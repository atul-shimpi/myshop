import { Component } from '@angular/core';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	isHome: boolean = true;
	
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		router.events.subscribe( (event: Event) => {
			if (event instanceof NavigationEnd) {
				//this.isHome = router.url == '/'; 
      }
		});
	}
}
