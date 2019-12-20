/*
Author: Shane Shimizu, Daniel Franci Barit
File Description: JSON array for products
Date: 11/30/19
*/
//JSON array for products
var userproducts = [
    
];

//Source from Profesor Daniel Port
//checks if the products in the array are defined
if (typeof module != 'undefined') {
    module.exports.userproducts = userproducts;
}

//when user clicks on the click me button on the home page
function welcome() {
    var name = prompt("Hi there! What is your name?"); //prompts the user for their name
    alert("Hi " + name + "! Welcome to my online store, click on the shop tab to view my products!"); //alerts their name and string
}

//for loop that displays products stored in the JSON array onto the products.html page when the function is called
function displayUserProducts() {
        document.write(`
            <div class="shop-item">
            <span class="shop-item-title">${userproducts[0].model}</span>
            <div class="enlarge">
                <img class="shop-item-image" src=${userproducts[0].image}>
            </div>
            <div class="shop-item-description">${userproducts[0].description}</div>
            <div class="shop-item-details">
                <span class="shop-item-price">$${userproducts[0].price.toFixed(2)}</span>
                <label id="quantity${0}_label" class="shop-item-quantity">Quantity</label>
                <input class="cart-quantity-input" type="text" name="quantity${0}" onkeyup=checkQuantityTextbox(this); placeholder="0">
            </div>
            </div>
        `);
    }





