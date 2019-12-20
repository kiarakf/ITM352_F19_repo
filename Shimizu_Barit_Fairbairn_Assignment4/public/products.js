/*
Author: Shane Shimizu, Daniel Franci Barit
File Description: JSON array for products
Date: 11/30/19
*/
//JSON array for products
var products = [
    {
        "model": "Aloha Bowl",
        "price": 9.00,
        "image": "/Images/alohabowl.png",
        "description": "Acai based blended with strawberries, blueberries and bananas. Bowl comes topped with granola, bananas, strawberries, and honey."

    },
    {
        "model": "Mana Bowl",
        "price": 9.00,
        "image": "/Images/manabowl.png",
        "description": "Peanut butter based blended with bananas. Bowl comes topped with granola, bananas, strawberries, and honey."


    },
    {
        "model": "Makai Womens T-Shirt",
        "price": 20.00,
        "image": "/Images/makaiwomenst.jpeg",
        "description": "Style: Women's Basic T-Shirt <br> This basic t-shirt features a relaxed fit for the female shape. <br> Size & Fit: Model is 5’7” and is wearing a small. <br> Standard fit: Fits true to size <br> Fabric & Care: 100% cotton. Double-needle hemmed sleeves and bottom. Machine wash cold. Imported"


    },
    {
        "model": "Makai Mens T-Shirt",
        "price": 20.00,
        "image": "/Images/makaimenst.jpeg",
        "description": "Style: Men's Basic T-Shirt <br> Comfortable, casual and loose fitting, our heavyweight t-shirt will easily become a closet staple. <br> Size & Fit: Model is 6’1” and is wearing a medium. <br> Standard fit: Fits true to size. <br> Fabric & Care: 100% cotton. Double-needle hemmed sleeves and bottom. Machine wash cold, tumble dry low. Imported"
    },
    {
        "model": "Makai Womens Longsleeve",
        "price": 25.00,
        "image": "/Images/makaiwomenslong.jpeg",
        "description": "Style: Women's Basic Long Sleeve T-Shirt <br> Comfortable, casual and loose fitting, our long-sleeve heavyweight t-shirt will quickly become one of your favorites.<br>Size & Fit: Model is 5’9” and wearing a small. <br>Standard fit: Runs true to size. <br> Fabric & Care: 100% cotton. Soft, tag-free neck label with a lay flat collar for comfort. Shoulder-to-shoulder tape for durability. Imported. Preshrunk. Machine wash cold"
    },
    {
        "model": "Makai Mens Longsleeve",
        "price": 25.00,
        "image": "/Images/makaimenslong.jpeg",
        "description": "Style: Men's Basic Long Sleeve T-Shirt <br> Comfortable, casual and loose fitting, our long-sleeve heavyweight t-shirt will quickly become one of your favorites. <br> Size & Fit: Model is 6’0” and wearing a medium. <br> Standard fit: Runs true to size. <br> Fabric & Care: 100% cotton. Soft, tag-free neck label with a lay flat collar for comfort. Shoulder-to-shoulder tape for durability. Imported. Preshrunk. Machine wash cold"
    },
    {
        "model": "Makai Womens Jacket",
        "price": 35.00,
        "image": "/Images/makaiwomensjacket.jpeg",
        "description": "Style: Women's Basic Hooded Sweatshirt <br> Enjoy the comfort of this warm and toasty pullover hoodie. <br> Size & Fit: Model is 5’9” and wearing a small. <br> Standard fit: Runs true to size. <br> Fabric & Care: 10oz. cotton-poly blend with a 100% cotton face. Roomy front pouch pocket and hood. Imported. Machine wash cold. Tumble dry Low."
    },
    {
        "model": "Makai Mens Jacket",
        "price": 35.00,
        "image": "/Images/makaimensjacket.jpeg",
        "description": "Style: Men's Basic Hooded Sweatshirt <br> Enjoy the comfort of this warm and toasty pullover hoodie. <br> Size & Fit: Model is 6’2” and wearing a large. <br> Standard fit: Runs true to size.<br> Fabric & Care: 10oz. cotton-poly blend with a 100% cotton face. Roomy front pouch pocket and hood. Imported. Machine wash cold. Tumble dry Low."
    },
    {
        "model": "Makai Hat",
        "price": 30.00,
        "image": "/Images/makaihat.jpeg",
        "description": "Want a good-looking comfortable hat? This one's for you.<br> <br> -Style: Alternative Apparel Basic Adjustable Cap <br> - From Alternative Apparel, this chino twill cap has a pre-curved bill, cloth strap and an antique brass slide buckle closure with tuck-in grommet, so it fits well on anyone. <br> -100% cotton woven. <br> -Unstructured. <br> -Low profile. <br> -Antiqued brass side buckle. <br> -Curved visor."
    
    },
    {
        "model": "Makai Reusable Bag",
        "price": 15.00,
        "image": "/Images/makaibag.jpeg",
        "description": "Style: Reusable Bag<br> Go green and save the planet with our reusable grocery bag! Made with a lightweight polyester fabric, this bag folds easily to fit in your purse or pocket. <br> Dimensions: 12' l x 5' w x 16' h <br> Made with lightweight polyester fabric.<br> Folds up with snap closure. <br>Holds up to 50 lbs."
    },
    {
        "model": "Makai Key Chain",
        "price": 7.00,
        "image": "/Images/makaichain.jpeg",
        "description": "Style: Basic Button Keychain <br> Dimensions: Diameter: 2.25'. Depth: 0.19'. Weight: 0.25 oz. <br> Waterproof"
    },
    {
        "model": "Makai Reusable Water Bottle",
        "price": 15.00,
        "image": "/Images/makaibottle.jpeg",
        "description": "Size: Water Bottle (18 oz) <br> Made with 18/8 stainless steel. <br> Height: 8.67' Weight: 8.7 oz. <br> 100% BPA free. <br> Comes with a threaded lid. <br> Lightweight and durable; crack proof, spill proof.<br> Does not give beverages a plastic taste. <br> Hand wash only. Not recommended for dishwasher. <br> Safe for refrigerator, but not freezer. <br> Certified free of harmful chemicals."
    },
];

//Source from Profesor Daniel Port
//checks if the products in the array are defined
if (typeof module != 'undefined') {
    module.exports.products = products;
}


//when user clicks on the click me button on the home page
function welcome() {
    var name = prompt("Hi there! What is your name?"); //prompts the user for their name
    alert("Hi " + name + "! Welcome to my online store, click on the shop tab to view my products!"); //alerts their name and string
}

//for loop that displays products stored in the JSON array onto the products.html page when the function is called
//<div class="shop-item-description">${products[i].description}</div>
//
//Source W3 Schools Cookies: https://www.w3schools.com/js/js_cookies.asp
//aloha bowl
function setCookie0(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie0(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function checkCookie0() {
    setCookie0("alohabowl", products[0], 30);
}
function checkCookie1(){
    setCookie0("manabowl", products[1], 30);

}
function checkCookie2(){
    setCookie0("womensshirt", products[2], 30);
    
}
function checkCookie3(){
    setCookie0("mensshirt", products[3], 30);
    
}
function checkCookie4(){
    setCookie0("womenssleeve", products[4], 30);
    
}
function checkCookie5(){
    setCookie0("menssleeve", products[5], 30);

}
function checkCookie6(){
    setCookie0("womensjacket", products[6], 30);
   
}
function checkCookie7(){
    setCookie0("mensjacket", products[7], 30);
   
}
function checkCookie8(){
    setCookie0("makaihat", products[8], 30);
    
}
function checkCookie9(){
    setCookie0("makaibag", products[9], 30);
    
}
function checkCookie10(){
    setCookie0("makaichain", products[10], 30);
    
}
function checkCookie11(){
    setCookie0("makaibottle", products[11], 30);
   
}


  function updateRecent0(){
    document.write(`
            <div class="shop-item">
                <div class="enlarge">
                    <img class="shop-item-image" src=${products[0].image}>
                </div>
                <div class="shop-item-description">${products[0].description}</div>
                <div class="shop-item-details">
                    <span class="shop-item-price">$${products[0].price.toFixed(2)}</span>
                </div>
            </div>
    `);
}

//<label id="quantity${i}_label" class="shop-item-quantity">Quantity</label>
//<input class="cart-quantity-input" type="text" name="quantity${i}" onkeyup=checkQuantityTextbox(this); placeholder="0">
function displayProducts() {
    for (i = 0; i < 2; i++) {
        document.write(`
            <div class="shop-item">
                <a href="${(products[i].model).replace(/\s+/g,'')}.html"><span class="shop-item-title">${products[i].model}</span></a>
                <div class="enlarge">
                    <img class="shop-item-image" src=${products[i].image}>
                </div>
                <div class="shop-item-details">
                <a href="${(products[i].model).replace(/\s+/g,'')}.html"><input class="btn btn-primary btn-purchase" type="button" name="purchase_submit" value="View More Info" onclick="checkCookie${i}()"></a>
                </div>
            </div>
        `);
    }
}

function displayProducts2(){
    for (i = 2; i < 8; i++) {
        document.write(`
            <div class="shop-item">
            <a href="${(products[i].model).replace(/\s+/g,'')}.html"><span class="shop-item-title">${products[i].model}</span></a>
                <div class="enlarge">
                    <img class="shop-item-image" src=${products[i].image}>
                </div>
                <div class="shop-item-details">
                <a href="${(products[i].model).replace(/\s+/g,'')}.html"><input class="btn btn-primary btn-purchase" type="button" name="purchase_submit" value="View More Info" onclick="checkCookie${i}()"></a>
                </div>
            </div>
        `);
    }   
}

function displayProducts3(){
    for (i = 8; i < 13 ; i++) {
        document.write(`
            <div class="shop-item">
            <a href="${(products[i].model).replace(/\s+/g,'')}.html"><span class="shop-item-title">${products[i].model}</span></a>
                <div class="enlarge">
                    <img class="shop-item-image" src=${products[i].image}>
                </div>
                <div class="shop-item-details">
                <a href="${(products[i].model).replace(/\s+/g,'')}.html"><input class="btn btn-primary btn-purchase" type="button" name="purchase_submit" value="View More Info" onclick="checkCookie${i}()"></a>
                </div>
            </div>
        `);
    }   
}

function displayAlohaBowl() {
        document.write(`
            <div class="shop-item">
                <div class="enlarge">
                    <img class="shop-item-image" src=${products[0].image}>
                </div>
                <div class="shop-item-description">${products[0].description}</div>
                <div class="shop-item-details">
                    <span class="shop-item-price">$${products[0].price.toFixed(2)}</span>
                </div>
            </div>
        `);  
}

function displayManaBowl() {
    document.write(`
        <div class="shop-item">
            <div class="enlarge">
                <img class="shop-item-image" src=${products[1].image}>
            </div>
            <div class="shop-item-description">${products[1].description}</div>
            <div class="shop-item-details">
                <span class="shop-item-price">$${products[1].price.toFixed(2)}</span>
            </div>
        </div>
    `);  
}

function displayMakaiWomensShirt() {
    document.write(`
        <div class="shop-item">
            <div class="enlarge">
                <img class="shop-item-image" src=${products[2].image}>
            </div>
            <div class="shop-item-description">${products[2].description}</div>
            <div class="shop-item-details">
                <span class="shop-item-price">$${products[2].price.toFixed(2)}</span>
            </div>
        </div>
    `);  
}

function displayMakaiMensShirt() {
    document.write(`
        <div class="shop-item">
            <div class="enlarge">
                <img class="shop-item-image" src=${products[3].image}>
            </div>
            <div class="shop-item-description">${products[3].description}</div>
            <div class="shop-item-details">
                <span class="shop-item-price">$${products[3].price.toFixed(2)}</span>
            </div>
        </div>
    `);  
}

function displayMakaiWomensSleeve() {
    document.write(`
        <div class="shop-item">
            <div class="enlarge">
                <img class="shop-item-image" src=${products[4].image}>
            </div>
            <div class="shop-item-description">${products[4].description}</div>
            <div class="shop-item-details">
                <span class="shop-item-price">$${products[4].price.toFixed(2)}</span>
            </div>
        </div>
    `);  
}

function displayMakaiMensSleeve() {
    document.write(`
        <div class="shop-item">
            <div class="enlarge">
                <img class="shop-item-image" src=${products[5].image}>
            </div>
            <div class="shop-item-description">${products[5].description}</div>
            <div class="shop-item-details">
                <span class="shop-item-price">$${products[5].price.toFixed(2)}</span>
            </div>
        </div>
    `);  
}

function displayMakaiWomensJacket() {
    document.write(`
        <div class="shop-item">
            <div class="enlarge">
                <img class="shop-item-image" src=${products[6].image}>
            </div>
            <div class="shop-item-description">${products[6].description}</div>
            <div class="shop-item-details">
                <span class="shop-item-price">$${products[6].price.toFixed(2)}</span>
            </div>
        </div>
    `);  
}

function displayMakaiMensJacket() {
    document.write(`
        <div class="shop-item">
            <div class="enlarge">
                <img class="shop-item-image" src=${products[7].image}>
            </div>
            <div class="shop-item-description">${products[7].description}</div>
            <div class="shop-item-details">
                <span class="shop-item-price">$${products[7].price.toFixed(2)}</span>
            </div>
        </div>
    `);  
}

function displayMakaiHat() {
    document.write(`
        <div class="shop-item">
            <div class="enlarge">
                <img class="shop-item-image" src=${products[8].image}>
            </div>
            <div class="shop-item-description">${products[8].description}</div>
            <div class="shop-item-details">
                <span class="shop-item-price">$${products[8].price.toFixed(2)}</span>
            </div>
        </div>
    `);  
}

function displayMakaiBag() {
    document.write(`
        <div class="shop-item">
            <div class="enlarge">
                <img class="shop-item-image" src=${products[9].image}>
            </div>
            <div class="shop-item-description">${products[9].description}</div>
            <div class="shop-item-details">
                <span class="shop-item-price">$${products[9].price.toFixed(2)}</span>
            </div>
        </div>
    `);  
}

function displayMakaiChain() {
    document.write(`
        <div class="shop-item">
            <div class="enlarge">
                <img class="shop-item-image" src=${products[10].image}>
            </div>
            <div class="shop-item-description">${products[10].description}</div>
            <div class="shop-item-details">
                <span class="shop-item-price">$${products[10].price.toFixed(2)}</span>
            </div>
        </div>
    `);  
}

function displayMakaiBottle() {
    document.write(`
        <div class="shop-item">
            <div class="enlarge">
                <img class="shop-item-image" src=${products[11].image}>
            </div>
            <div class="shop-item-description">${products[11].description}</div>
            <div class="shop-item-details">
                <span class="shop-item-price">$${products[11].price.toFixed(2)}</span>
            </div>
        </div>
    `);  
}

function displayUserProducts() {
    document.write(`
        <div class="shop-item">
        <span class="shop-item-title">${storedUsersCartArray[0].model}</span>
        <div class="enlarge">
            <img class="shop-item-image" src=${storedUsersCartArray[0].image}>
        </div>
        <div class="shop-item-description">${storedUsersCartArray[0].description}</div>
        <div class="shop-item-details">
            <span class="shop-item-price">$${storedUsersCartArray[0].price.toFixed(2)}</span>
            <label id="quantity0_label" class="shop-item-quantity">Quantity</label>
            <input class="cart-quantity-input" type="text" name="quantity0" onkeyup=checkQuantityTextbox(this); placeholder="0">
        </div>
        </div>
    `);
}
var storedUsersCartArray = [];
if (typeof module != 'undefined') {
    module.exports.storedUsersCartArray = storedUsersCartArray;
}