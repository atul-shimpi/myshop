import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// app imports
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { ManageProductsComponent } from './products/manage-products.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
	{ path: 'test', component: TestComponent },
	{ path: 'products', component: ManageProductsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}