
// done: Running this application will first display all of the items available for sale. 
// done: Include the ids, names, and prices of products for sale.

// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
// Once the customer has placed the order, your application should check if your 
// store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, 
// and then prevent the order from going through.
// However, if your store does have enough of the product, 
// you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.
var mysql = require("mysql");
var inquirer = require("inquirer");

var queryItems =[];

var consoleTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "manuela321",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  //runSearch();
  
  console.log("connected as id " + connection.threadId);
});

var productID = '';
var orderQuantity = 0;
var newStock = 0;

var displayItems = function() {
		
	var query = "SELECT * FROM products"; 
	connection.query(query, function(err, result) {

	console.log("Hello, Welcome to Bamazon! Here are all of the products");
	console.log("-------------------------------------------------------");
	console.table(result);
	
	for (var i = 0; i < result.length; i++) {
		queryItems.push(result[i]);	
	}
		
	console.log("-----------------------------------");

	userPromptProductID();

	// return result;
	// if (err) throw err;
	});

};

displayItems();

var userPromptProductID = function() {
	inquirer.prompt([{
	    type: "input",
	    message: "Enter the product id, you like to buy?",
	    name: "commands",
		validate: function (input) {
			// Declare function as asynchronous, and save the done callback 
			var	validateCallback = this.async();
		 
		  	// Do async stuff 
			if (input === '' ) {
				// 	Pass the return value in the done callback 
				validateCallback('Enter valid Product ID');
				return;
			}

			productID = input;
			validateProductExists(productID, validateCallback);
			// Pass the return value in the done callback 
			//validateCallback(null, true);
		}
	}
	]).then(function(answers) {
		userPromptOrderQuantity();
	});

}

var userPromptOrderQuantity = function() {

	inquirer.prompt([{
		type: "input",
	    message: "How many units of the product you would like to buy?",
	    name: "Quantitycommands",
		validate: function (input) {
			// Declare function as asynchronous, and save the done callback 
			var	validateCallback = this.async();
		 
		  	// Check for valid input
			if (input === '' || isNaN(parseInt(input))) {
				// 	Pass the return value in the done callback 
				validateCallback('Enter valid Order Quantity value');
				return;
			}

			orderQuantity = input;
			//Check for Stock Quantity
			validateOrderQuantityInStock(productID, orderQuantity,validateCallback);

			// Pass the return value in the done callback 
			//validateCallback(null, true);
		}
	}]).then(function(answers) {
		 updateStock(productID, orderQuantity, newStock);
	});
}

var userPromptContinueShopping = function ()
{
	inquirer.prompt([{
		type: "list",
	    message: "Do you want to continue shopping?",
	    choices: [ "Yes", "No" ],
	    default: ["Yes"],
	    name: "choice"
	}]).then(function(answers) {
		if(answers.choice === "Yes")
		{
			displayItems();
		} else
		{
			closeConnection();
		}
	});
}

var validateProductExists = function (productID, validateCallback) {
	var isProductIDValidQuery = "SELECT product_id FROM products WHERE ?";
   	connection.query(isProductIDValidQuery, { product_id: productID }, 
   		function(err, result) {

   			if(result.length > 0)
   			{
   				//console.log("\nProduct ID exists");
   				validateCallback(null, true);
   			} else
   			{
   				console.log("\nProduct not in inventory. Please enter valid product id");
   				validateCallback(null, false);
   			}

	   		if(err)throw err;
   		}
   	);
}

var validateOrderQuantityInStock = function (productID, orderQuantity, validateCallback)
{
	console.log("\nproductID:"+productID);
	console.log("\norderQuantity:"+orderQuantity);
	var productStockCheckQuery = "SELECT stock_quantity FROM products WHERE ?";
   	connection.query(productStockCheckQuery, { product_id: productID }, 
   		function(err, result) {
	   		var currentStock = result[0].stock_quantity;
	   		if(err)throw err;

		   	if(orderQuantity > currentStock){
			    console.log("\nSorry, out of stock!");
			    console.log("Currently only have " + currentStock + " in stock");
			    
			    validateCallback(null, false);
		  	}
		  	else{
			    console.log("\nIn stock!");
			    console.log("Currently we have " + currentStock + " in stock");
			    newStock = currentStock - orderQuantity
			    validateCallback(null, true);
			}
   		}
   	);
};

var updateStock = function(productID, orderQuantity, newStock){

  	connection.query("UPDATE products SET ? WHERE ?",
  		[ { stock_quantity: newStock },{ product_id: productID } ], 
  		function(err, result) {

  			//To display the Total cost of the order placed by the customer.
  			connection.query('SELECT price FROM products WHERE ?', 
					{ product_id: productID }, 
					function(err, result1){
						if(err)throw err;
						
						console.log("...................................")
						console.log("Your total cost is " + result1[0].price * orderQuantity);
					}
			);
	    	
	    	//To display the Stock balance after Order completion.
	    	connection.query('SELECT stock_quantity FROM products WHERE ?', 
	    		{ product_id: productID }, function(err, result2) {
	    	
		    	if(err) throw err;
		    		console.log("...................................")
		    		console.log("Order Placed!");
		    		//console.log("The stock now has " + result2[0].stock_quantity);

		    	userPromptContinueShopping();
	  		})
	})
}

var closeConnection = function () {
	connection.end();
}