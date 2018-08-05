'use strict';
const CategoriesAndProductsService = require('./service');

class CategoriesAndProductsController {
  // Get categorie(s)
  getCategories(req, res) {
    CategoriesAndProductsService.getCategories((err, data) => {
      if(err) {
        res.send(null, data);
      } else {
        res.send(data);
      }
    });
  }

  // Create category
  createCategory(req, res) {
    const categoryToAdd = { };
 	 
    categoryToAdd.name = req.body.name;
    categoryToAdd.parentCategoryId = req.body.parentCategoryId;
   
    CategoriesAndProductsService.createCategory(categoryToAdd, (err, data) => {
      if(err) {
        res.send(null, data);
      } else {
        res.send(data);
      }
    });
  }

  // update category
  updateCategory(req, res) {
    const categoryToAdd = { };
    
    categoryToAdd.id = req.params.id;
    categoryToAdd.name = req.body.name;
   
    CategoriesAndProductsService.updateCategory(categoryToAdd, (err, data) => {
      if(err) {
        res.send(null, data);
      } else {
        res.send(data);
      }
    });
  }

  // delete category
  deleteCategory(req, res) {
    CategoriesAndProductsService.deleteCategory(req.params.id, (err, data) => {
      if(err) {
        res.send(null, data);
      } else {
        res.send(data);
      }
    });    
  }

}

module.exports = new CategoriesAndProductsController();