var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "568csb8i",
    database: "bamazon_db"
});

// If connection doesn't work, throws error, else...
connection.connect(function (err) {
    if (err) throw err;

    // when user runs app, products display
    displayProducts();

});



//function that displays info on all products: id, names, prices.

var displayProducts = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {

        if (err) throw err;

        for (var i = 0; i < res.length; i++) {

            //only displays items that are in stock
            if(res[i].stock_quantity > 0){
                
            console.log("Product ID: " + res[i].item_id + " || Product Name: " +
                res[i].product_name + " || Price: $" + res[i].price);
        }
    }

        // Requests product and number of product items user wishes to purchase.
        promptPurchase();
    });
};


//after displaying inventory, prompt user with two messages
//  product id
//  how many? 

function promptPurchase() {
    inquirer.prompt([
        {
            name: "productID",
            type: "input",
            message: "Please enter the product ID for the product you want to purchase.",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, 
        
        {
            name: "productUnits",
            type: "input",
            message: "How many do you want to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false
            }

        }
    ]).then(function(answer) {

		// Queries database for selected product.
		var query = "Select stock_quantity, price, product_sales, department_name FROM products WHERE ?";
		connection.query(query, { item_id: answer.productID}, function(err, res) {
			if (err) throw err;
			var available_stock = res[0].stock_quantity;
			var price_per_unit = res[0].price;
			var productSales = res[0].product_sales;
            var productDepartment = res[0].department_name;
            var stock=res[0].stock_quantity;

            console.log(stock);

			// Checks there's enough inventory  to process user's request.
			if (available_stock >= answer.productUnits) {

				// Processes user's request passing in data to complete purchase.
				completePurchase(available_stock, price_per_unit, answer.productID, answer.productUnits);
			} else {

				// Tells user there isn't enough stock left.
				console.log("There isn't enough stock left! Run the app again if you want to purchase something else.");
            }
            connection.end();

        });

	});
};


// Completes user's request to purchase product.
var completePurchase = function(availableStock, price, selectedProductID, selectedProductUnits) {
	
	// Updates stock quantity once purchase complete.
	var updatedStockQuantity = availableStock - selectedProductUnits;

	// Calculates total price for purchase based on unit price, and number of units.
	var totalPrice = price * selectedProductUnits;
	
	// Updates stock quantity on the database based on user's purchase.
	var query = "UPDATE products SET ? WHERE ?";
	connection.query(query, [{
		stock_quantity: updatedStockQuantity,
	}, {
		item_id: selectedProductID
	}], function(err, res) {

		if (err) throw err;
		// Display the total price for that purchase.
        console.log("Thanks for shopping with us! Here's your total: " + totalPrice);
        
        //Prompts user to run app again for additional purchases
        console.log("To make another purchase, run the app again.")

		// Updates department revenue based on purchase.
		//updateDepartmentRevenue(updatedProductSales, productDepartment);
		// Displays products so user can make a new selection.
	});
};

