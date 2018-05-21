import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
   MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
