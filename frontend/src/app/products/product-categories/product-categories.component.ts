// angular services 
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';


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
  productsAndCategories: any;  
  isAddingSubCategory = false;
  isEditingCategory = false;
  categoryId: string = null;
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

        const obj =  this.findById(this.productsAndCategories,'1002');
        console.log('Found : ' + JSON.stringify(obj));
      }
    );
  }

  onModalOpened() {
    this.ctgInputBox.nativeElement.focus();    
  }

  onClickAddCategoryBtn() {
    this.categoryName = null
    this.modalTitle = 'Add Category';
    this.fieldTitle = 'Category Name';
    this.isAddingSubCategory = false;
  }

  onClickAddSubCategoryBtn(category) {
    this.categoryName = null
    this.modalTitle = 'Add Sub Category';
    this.fieldTitle = 'Sub Category Name';
    this.parentCategoryId = category.id;
    this.isAddingSubCategory = true;
  }

  onClickAddEditCategoryBtn(category) {
    this.categoryName = category.name;
    this.modalTitle = 'Edit Category';
    this.fieldTitle = 'Category Name';
    this.categoryId = category.id;
    this.isEditingCategory = true;
  }
	
  onClickSaveCategoryBtn() {
    if ( this.isEditingCategory ) {
      this.updateCategory();
    } else {
      this.saveCategory();
    }
  }

  saveCategory() {
    const category: any = { };

    category.name = this.categoryName;

    if ( this.isAddingSubCategory ) {
      category.parentCategoryId = this.parentCategoryId;
    }

    this.categoriesAndProductsService.save(category)
      .subscribe(categorySaved => { 
        if ( this.isAddingSubCategory ) {
          const parentCtg = this.findById(this.productsAndCategories, category.parentCategoryId);
          
          parentCtg.subCategories = parentCtg.subCategories || [];
          parentCtg.subCategories.push(category);
        } else {
          this.productsAndCategories.push(category);
        }
        this.tree.treeModel.update();

        this.isAddingSubCategory = false;
      }
    )    
  }

  updateCategory() {
    const category: any = { };

    category.id = this.categoryId;
    category.name = this.categoryName;

    this.categoriesAndProductsService.update(category)
      .subscribe(categorySaved => {         
        const parentCtg = this.findById(this.productsAndCategories, category.parentCategoryId);
        
        parentCtg.name = category.name;
        this.tree.treeModel.getNodeById(category.id).data.name = category.name;

        this.isEditingCategory = false;
      }
    )   

  }


  deleteCategory(categoryId) {
    this.categoriesAndProductsService.delete(categoryId)
      .subscribe(categoryDeleted => {   
        alert(JSON.stringify(categoryDeleted));  

        if ( categoryDeleted.path.length == 0 ) {
          this.productsAndCategories.splice(categoryDeleted.index, 1);
        } else {
          const obj = this.productsAndCategories;

          categoryDeleted.path.forEach( val => {
            obj = obj[val];
          });

          console.log('Obj ' + JSON.stringify(obj));
          obj.splice(categoryDeleted.index, 1);
        }
        this.tree.treeModel.update();
      }
    )  
  }

  findById(obj, id) {
    var result;
    for (var p in obj) {
        if (obj.id === id) {
            return obj;
        } else {
            if (typeof obj[p] === 'object') {
                result = this.findById(obj[p], id);
                if (result) {
                    return result;
                }
            }
        }
    }
    return result;
}
}
