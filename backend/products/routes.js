'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const uniqid = require('uniqid');
const _ = require('lodash');
_.mixin(require("lodash-deep"));
//==========================================================

let productsAndCategories = {};
let deletePath = null;

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

	function addSubCategory_(sourceCategory, categoryToAdd) {
		sourceCategory.subCategories = sourceCategory.subCategories || [];
		sourceCategory.subCategories.push(categoryToAdd);
		saveFile();
	}
}

function deleteCategoryByID(categories, parentCtgId) {
	var obj = categories;
	const deletePath = { };

	_.deepMapValues(categories, function(value, path) {
    	if (value == parentCtgId) {
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

	return deletePath;
}

router.get('/', 
	(req, res) => res.send(productsAndCategories)
)

router.delete('/:id', (req, res) => {
 	const deletedPath = deleteCategoryByID(productsAndCategories, req.params.id);
 	saveFile();
 	res.send(deletedPath);
 });

router.put('/:id', (req, res) => {
	console.log('Updatingxxx ' + req.body.name);
 	console.log('Id ' + req.params.id);

 	const categoryToUpdate = findById(productsAndCategories, req.params.id);
 	categoryToUpdate.name =  req.body.name;
 	saveFile();
 	
 	res.send(categoryToUpdate);
 });

router.post('/',  (req, res) => {
 	console.log('Creating name : ' + req.body.name);
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

function findById(obj, id) {
    var result;
    for (var p in obj) {
        if (obj.id === id) {
            return obj;
        } else {
            if (typeof obj[p] === 'object') {
                result = findById(obj[p], id);
                if (result) {
                    return result;
                }
            }
        }
    }
    return result;
}

const removeEmpty = (obj) => {
	return;
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
  	if (obj[prop] === null ) console.log('XXXXX IS NULL');
    if (obj[prop] !== null) { newObj[prop] = obj[prop]; }
  });

  console.log('Deleted ' + JSON.stringify(obj));
  return newObj;
};

module.exports = router;