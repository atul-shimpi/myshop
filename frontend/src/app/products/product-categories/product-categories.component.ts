// angular services 
import { Component, OnInit, ViewChild } from '@angular/core';


//third party
import { TreeComponent, TreeModel, TreeNode } from 'angular-tree-component';

// app services
import { CategoriesAndProductsService } from '../categories-and-products.service';

@Component({
  selector: 'myshop-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent {
  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  @ViewChild('ctgInputBox') ctgInputBox:ElementRef;

  options = { childrenField: 'subCategories' };

  // private properties
  productsAndCategories = [];  
  isAddingSubCategory = false;
  categoryName: string = null;
  parentCategoryId: string;
  modalTitle: string = 'Add Category';
  fieldTitle: string = 'Category Name';
  
  constructor(
    private categoriesAndProductsService: CategoriesAndProductsService
  ) {
    categoriesAndProductsService.getAll()
    .subscribe(
      data => {
        this.productsAndCategories = data;
      }
    );
  }

  onModalOpened() {
    //alert('hi');
    this.ctgInputBox.nativeElement.focus();
    console.log('oPEND');
  }

  onClickAddCategoryBtn() {
    this.modalTitle = 'Add Category';
    this.fieldTitle = 'Category Name';
    this.isAddingSubCategory = false;
  }

  onClickAddSubCategoryBtn(category) {
    this.modalTitle = 'Add Sub Category';
    this.fieldTitle = 'Sub Category Name';
    this.parentCategoryId = category.id;
    this.isAddingSubCategory = true;
  }
	
  onClickSaveCategoryBtn() {
    const category = { };

    category.name = this.categoryName;

    if ( this.isAddingSubCategory ) {
      category.parentCategoryId = this.parentCategoryId;  
      alert(JSON.stringify(category)); 
    }

    this.categoriesAndProductsService.save(category)
      .subscribe(category => { 
        this.productsAndCategories.push(category);
        this.tree.treeModel.update();
      }
    )
    
    this.isAddingSubCategory = false;
  }
}
