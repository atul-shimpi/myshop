import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// app imports
import { ProductsModule } from './products/products.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
	TestComponent
  ],
  imports: [
    BrowserModule,
	ProductsModule,
	AppRoutingModule,
   MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
