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

console.log("i work")

// If connection doesn't work, throws error, else...
connection.connect(function (err) {
    if (err) throw err;

    // when user runs app, app products display
    displayProducts();

});



//function that displays all products: id, names, prices.

var displayProducts = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {

        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " || Product Name: " +
                res[i].product_name + " || Price: $" + res[i].price);
        }

        // Requests product and number of product items user wishes to purchase.
        promptPurchase();
    });
};


//after displaying inventory, prompt user with two messages
//  product id
//  how much? 

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
        }, {
            name: "productUnits",
            type: "input",
            message: "How many units do you want?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false
            }

        }
    ])
}


//after user places order, check to see if there is enough product
    //ifnot, log "insufficient quantity!" > prevent order
    //if so, fullfill customer order & update database, after the update, show customer total cost