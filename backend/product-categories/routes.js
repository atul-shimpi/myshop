'use strict';
const express = require('express');
const router = express.Router();
const CategoriesAndProdsController = require('./controller');
//==========================================================

// categories
// -----------------------------------------------------------------
router.get('/', (req, res) => {
	CategoriesAndProdsController.getCategories(req, res);
});

router.delete('/:id', (req, res) => {
	CategoriesAndProdsController.deleteCategory(req, res)
 });

router.put('/:id', (req, res) => {
	CategoriesAndProdsController.updateCategory(req, res);
 });

router.post('/',  (req, res) => {
	CategoriesAndProdsController.createCategory(req, res);
});

// products
// -------------------------------------------------------------------
router.get('/:id/products', (req, res) => {
	const ctg = findById(productsAndCategories, req.params.id)

	if(ctg === undefined) {
		res.status(404)
		res.json({ errCode: 404});
	} else {
		res.send(ctg.products);
	}
});

module.exports = router;