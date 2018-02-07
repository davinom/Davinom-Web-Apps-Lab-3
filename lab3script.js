var name;
var drink;
var drink_size;
var quantity;
var drinkPrice=0.0;
var dateOfBirthInput = false;
var prices = [["Coffee", 1.0], ["Tea", 2.0], ["Beer", 3.0], ["Wine", 4.0]]
var sizeprice=[["Small", 1.0], ["Medium", 1.50], ["Large", 2.0]]
var isTwentyOne = false;
var displayString1;
var displayString2;
var finalPrice=0.0;
var mm;
var dd;
var yyyy;
var displayString3;

function getName() {
    name = document.getElementById("name").value;
    //console.log(name);
}

function getDrink() {
    drink = document.getElementById("mySelect").value;
    if (drink == "Beer" || drink == "Wine") {
        toggleOn("BirthdayInput");
        dateOfBirthInput = true;
    }
    else {
        toggleOff("BirthdayInput");
        dateOfBirthInput = false;
    }

    //console.log(drink);
}

function getDrinkSize() {
    var radios = document.getElementsByName("drink_size");

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            drink_size = radios[i].value;
            //console.log(radios[i].value);
            break;
        }
    }
}

function getQuantity() { 
    quantity = document.getElementById("Quantity").value;
    //console.log(quantity);
}

function toggleOn(id) {
    document.getElementById(id).style.display = "inline";

}
function toggleOff(id) {
    document.getElementById(id).style.display = "none";

}

function getPrice() {
    getDrink();
    getDrinkSize();
    getQuantity();
    for (var i = 0; i < prices.length; i++) {
        if (drink == prices[i][0]) {
            drinkPrice=prices[i][1];
        }
    }
    for (var j = 0; j < sizeprice.length; j++) {
        if (drink_size == sizeprice[j][0]) {

            drinkPrice = drinkPrice * sizeprice[j][1];
        }
    }
    finalPrice = drinkPrice * quantity;


}

function birthdayChecker() {
    var birthday = document.getElementById("Birthday").value;

    var today = new Date();
     dd = today.getDate();
     mm = today.getMonth() + 1; //January is 0!

     yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = dd + '/' + mm + '/' + yyyy;
   // console.log(today);

    var str = birthday.toString();
    var birthyear = parseInt(str.substring(0, 4));
    var birthmonth = parseInt(str.substring(5, 7));
    var birthdaynumber = parseInt(str.substring(8, 10));
    //console.log(birthyear);
   // console.log(birthmonth);
   // console.log(birthdaynumber);

    isTwentyOne=false;

    if((yyyy-birthyear)>21)
    {
        isTwentyOne = true;
    }
    else if ((yyyy - birthyear == 21)) {
        if (mm > birthmonth) {
            isTwentyOne = true;
        }
        else if (mm == birthmonth) {
            if (dd>=birthdaynumber)
            {
                isTwentyOne = true;

            }
        }
    }
}


function displayInfo() {
    getName();
    getDrink();
    getDrinkSize();
    getQuantity();
    getPrice();
    birthdayChecker();
    toggleOff("not21");
    toggleOff("reciept");

    if (quantity >= 1) {
        if (dateOfBirthInput === false) {
            toggleOn("reciept");
            if (drink_size == "Medium") {
                displayString1 = name + " ordered " + quantity + " " + drink_size + " " + drink + " @ $" + drinkPrice + "0 each";
                if (quantity % 2 == 1) {
                    displayString2 = "TOTAL DUE $" + finalPrice + "0";
                }
                else {
                    displayString2 = "TOTAL DUE $" + finalPrice;
                }
            }
            else {
                displayString1 = name + " ordered " + quantity + " " + drink_size + " " + drink + " @ $" + drinkPrice + " each";
                displayString2 = "TOTAL DUE $" + finalPrice;
            }
        }
        else {
            toggleOff("reciept");
            if(isTwentyOne)
            {
                toggleOn("reciept");
                if (drink_size == "Medium") {
                    displayString1 = name + " ordered " + quantity + " " + drink_size + " " + drink + " @ $" + drinkPrice + "0 each";
                    if (quantity % 2 == 1) {
                        displayString2 = "TOTAL DUE $" + finalPrice + "0";
                    }
                    else {
                        displayString2 = "TOTAL DUE $" + finalPrice;
                    }
                }
                else {
                    displayString1 = name + " ordered " + quantity + " " + drink_size + " " + drink + " @ $" + drinkPrice + " each";
                    displayString2 = "TOTAL DUE $" + finalPrice;
                }
            }
            else {
                toggleOff("reciept");
                toggleOn("not21");
                displayString3= mm + " " + dd + " " + (yyyy-21);
            }
            //console.log("enter your birthday");
        }
    }
    document.getElementById("change1").innerHTML = displayString1;
    document.getElementById("change2").innerHTML = displayString2;
    document.getElementById("change3").innerHTML = displayString3;
}

