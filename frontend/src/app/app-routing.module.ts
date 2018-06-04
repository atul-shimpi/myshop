import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// app imports
import { HomeComponent } from './home/home.component';
import { ManageProductsPageComponent } from './products/manage-products-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
	{ path: 'products', component: ManageProductsPageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}