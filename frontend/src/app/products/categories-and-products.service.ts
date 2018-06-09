import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoriesAndProductsService {
  constructor(private http:HttpClient) {}
 
  getAll() {
    return this.http.get('http://localhost:3000/products');
  }

  save(category) {
  	return this.http.post('http://localhost:3000/products', category);
  }
}
