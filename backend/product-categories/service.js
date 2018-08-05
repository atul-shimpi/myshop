'use strict';
const fs = require('fs');
const uniqid = require('uniqid');
const _ = require('lodash');
_.mixin(require("lodash-deep"));
//==========================================================
let productsAndCategories = {};
let deletePath = null;

const PRODUCTS_FILE = './product-categories/products.json';

class CategoriesAndProductsService {
  constructor() {
    this.productsAndCategories = { };
    
    fs.readFile(PRODUCTS_FILE, (err, data) => {  
      if (err) throw err;
      this.productsAndCategories = JSON.parse(data);
    });  
  }

	// get categories
  getCategories(callback) {
    callback(null, this.productsAndCategories);
	}
	
	// create category
	createCategory(ctg, callback) {
		const categoryToAdd = { };
	
		categoryToAdd.id = uniqid();
		categoryToAdd.name = ctg.name;

		if ( ctg.parentCategoryId ) {
			this.addSubCategory(this.productsAndCategories, ctg.parentCategoryId, categoryToAdd);
		} else {
			this.productsAndCategories.push(categoryToAdd);
		}
		
		console.log(categoryToAdd);
		this.saveFile();
		callback(null, categoryToAdd);		
	}

	// update category
	updateCategory(ctg, callback) {
		const categoryToUpdate = this.findById(this.productsAndCategories, ctg.id);
		categoryToUpdate.name =  ctg.name;
		this.saveFile();
		callback(null, categoryToUpdate);		
	}

	// delete category
	deleteCategory(ctgId, callback) {
		var obj = this.productsAndCategories;
		const deletePath = { };
	
		_.deepMapValues(this.productsAndCategories, function(value, path) {
				if (value == ctgId) {
					var paths = path.split('.');
	
					if (isNaN(paths[0])) paths.unshift(0);
	
					paths.pop();
					console.log('Paths ' + paths);
					var idx = paths.pop();	    	
					
					paths.forEach( val => {
						obj = obj[val];
					});
					
					obj.splice(idx, 1);	
	
					deletePath.path = paths;
					deletePath.index = parseInt(idx);	    	
				}    
		});
	
		this.saveFile();
		callback(null, deletePath);
	}
	
	saveFile() {
		fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(this.productsAndCategories,null,4));
	}	

	addSubCategory(categories, parentCtgId, categoryToAdd) {
		let sourceCategory = this.getSubCategory(categories, parentCtgId);
	
		this.addSubCategory_(sourceCategory, categoryToAdd);	
		console.log('sourceCategory : ' + JSON.stringify(sourceCategory));
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

	getSubCategory(categories, parentCtgId) {
		var obj = categories;

		_.deepMapValues(categories, function(value, path) {
				if (value == parentCtgId) {
					console.log('Path ' + path);
					var paths = path.split('.');

					if (isNaN(paths[0])) {
							//console.log('XXXXXXXX');
							paths.unshift(0);
					} 

					paths.pop();
					console.log('Paths ' + JSON.stringify(paths));	
					//obj = categories;

					paths.forEach( val => {
						obj = obj[val];
					});

					console.log('Found ' + JSON.stringify(obj));
					
				}    
		});

		return obj;
	}

	addSubCategory_(sourceCategory, categoryToAdd) {
		sourceCategory.subCategories = sourceCategory.subCategories || [];
		sourceCategory.subCategories.push(categoryToAdd);
		this.saveFile();
	}

}

module.exports = new CategoriesAndProductsService();