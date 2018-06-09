// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// third party modules
import { TreeModule } from 'angular-tree-component';

// app modules
import { SharedModule } from '../shared/shared.module';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductsComponent } from './products/products.component';
import { ManageProductsPageComponent } from './manage-products-page.component';

// services
import { CategoriesAndProductsService } from './categories-and-products.service';

@NgModule({
	providers: [
		CategoriesAndProductsService
	], 		
  imports: [
    CommonModule,
	TreeModule,
	SharedModule
  ],
  declarations: [
		ManageProductsPageComponent,
		ProductCategoriesComponent,
		ProductsComponent
	]
})
export class ProductsModule { }
