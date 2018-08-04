import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// services
import { CategoriesAndProductsService } from './services/categories-and-products.service';
// components
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
// router
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule	
  ],
  declarations: [
    AppHeaderComponent,
    AppMenuComponent
  ],
  providers: [
    CategoriesAndProductsService 
  ],
  exports: [
    AppHeaderComponent,
	  AppMenuComponent
  ],
  schemas: [
   NO_ERRORS_SCHEMA
  ]
})
export class CoreModule { }
