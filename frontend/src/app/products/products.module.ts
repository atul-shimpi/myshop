// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app modules
import { SharedModule } from '../shared/shared.module';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductsComponent } from './products/products.component';
import { ManageProductsPageComponent } from './manage-products-page.component';

@NgModule({
  imports: [
    CommonModule,
		SharedModule
  ],
  declarations: [
		ManageProductsPageComponent,
		ProductCategoriesComponent,
		ProductsComponent
	]
})
export class ProductsModule { }
