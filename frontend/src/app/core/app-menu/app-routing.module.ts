import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// app imports
import { HomeComponent } from '../home/home.component';
import { ManageProductsComponent } from '../products/manage-products.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
	{ path: 'products', component: ManageProductsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}