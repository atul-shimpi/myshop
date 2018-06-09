// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

// vendor modules
import { MDBBootstrapModule } from 'angular-bootstrap-md';

//my shop components
import { PageHeaderComponent } from './components/page-header/page-header.component';

// my shop directives
import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	MDBBootstrapModule.forRoot()
  ],
  declarations: [
		PageHeaderComponent,
		AutofocusDirective
	],
	exports: [
		FormsModule,
		PageHeaderComponent,
		AutofocusDirective,
		MDBBootstrapModule
	]
})
export class SharedModule { }
