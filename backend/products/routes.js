'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const uniqid = require('uniqid');
const _ = require('lodash');
_.mixin(require("lodash-deep"));
//==========================================================

let productsAndCategories = {};

fs.readFile('./products/products.json', (err, data) => {  
    if (err) throw err;
    productsAndCategories = JSON.parse(data);

    const categoryToAdd = { };
 	var parentCtg;
 	categoryToAdd.id = uniqid();
 	categoryToAdd.name = 'req.body.name';

 	//addSubCategory(productsAndCategories, 400, categoryToAdd);
});

function addSubCategory(categories, parentCtgId, categoryToAdd) {
	let sourceCategory = getSubCategory(categories, parentCtgId);

	addSubCategory_(sourceCategory, categoryToAdd);

	console.log('sourceCategory : ' + JSON.stringify(sourceCategory));

	function getSubCategory(categories, parentCtgId) {
		var obj = categories;

		_.deepMapValues(categories, function(value, path) {
	    	if (value == parentCtgId) {
	    		//console.log('Path ' + path);
		    	var paths = path.split('.');

		    	if (isNaN(paths[0])) {
		    			console.log('XXXXXXXX');
		    			paths.unshift(0);
		    	} 

		    	paths.pop();
		    	//console.log('Paths ' + JSON.stringify(paths));	
		    	//obj = categories;

		    	paths.forEach( val => {
		    		obj = obj[val];
		    	});

		    	console.log('Found ' + JSON.stringify(obj));
		    	
	    	}    
		});

		return obj;
	}

	function addSubCategory_(sourceCategory, categoryToAdd) {
		sourceCategory.subCategories = sourceCategory.subCategories || [];
		sourceCategory.subCategories.push(categoryToAdd);
		saveFile();
	}
}

router.get('/', 
	(req, res) => res.send(productsAndCategories)
)

router.post('/',
 (req, res) => {
 	const categoryToAdd = { };
 	var parentCtg;
 	categoryToAdd.id = uniqid();
 	categoryToAdd.name = req.body.name;

 	if ( req.body.parentCategoryId ) {
 		addSubCategory(productsAndCategories, req.body.parentCategoryId, categoryToAdd);
 	} else {
 		productsAndCategories.push(categoryToAdd);
 	}
 	
 	//console.log(categoryToAdd);
 	saveFile();
 	
 	res.send(categoryToAdd);
 }
);


function saveFile() {
	fs.writeFileSync('./products/products.json', JSON.stringify(productsAndCategories,null,4));
}

module.exports = router;