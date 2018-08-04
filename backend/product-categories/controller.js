'use strict';
const CategoriesAndProductsService = require('./service');

class CategoriesAndProductsController {
  getCategories(req, res) {
    CategoriesAndProductsService.getCategories((err, data) => {
      if(err) {
        res.send(null, data);
      } else {
        res.send(data);
      }
    });
  }
}

module.exports = new CategoriesAndProductsController();