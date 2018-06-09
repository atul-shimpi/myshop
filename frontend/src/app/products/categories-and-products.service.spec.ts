import { TestBed, inject } from '@angular/core/testing';

import { CategoriesAndProductsService } from './categories-and-products.service';

describe('CategoriesAndProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriesAndProductsService]
    });
  });

  it('should be created', inject([CategoriesAndProductsService], (service: CategoriesAndProductsService) => {
    expect(service).toBeTruthy();
  }));
});
