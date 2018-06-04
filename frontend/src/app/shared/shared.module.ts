// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// vendor modules
import { MDBBootstrapModule } from 'angular-bootstrap-md';
//my shop components
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
		MDBBootstrapModule.forRoot()
  ],
  declarations: [
		PageHeaderComponent
	],
	exports: [
		PageHeaderComponent,
		MDBBootstrapModule
	]
})
export class SharedModule { }
