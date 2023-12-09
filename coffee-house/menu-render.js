import json from "/product.js";

const product = JSON.parse(json);
const grid = document.querySelector(".grid");

const btn = document.querySelectorAll(".tab");
const btnCoffee= document.querySelector(".coffee");
const btnTea = document.querySelector(".tea");
const btnDessert = document.querySelector(".dessert");

const refresh = document.querySelector(".refresh");


let screenWidth;
let card = "";
let items;

btn.forEach((elem) => {
    elem.addEventListener("click", () => {
        btn.forEach((tab) => tab.classList.remove("active"));

        elem.classList.add("active")
    })
})

function render(i) {
        card = `
            <div class="item">
                <div class="image-wraper"><img class="image" src="${product[i].image}" alt="${product[i].name}" width="340" height=""340></div>
                <div class="description">
                    <div class="title">
                        <h2 class="coffee-name">${product[i].name}</h2>
                        <p class="coffee-description">${product[i].description}</p>
                    </div>
                    <span class="price">$${product[i].price}</span>
                </div>
            </div>`

        grid.innerHTML += card;

        let item = document.querySelector(".item");
        
        

}

window.addEventListener("resize", () => {
    screenWidth = window.innerWidth;
    count(document.querySelectorAll(".item"));
})

function count(arr) {
    arr.forEach((elem, index) => {
        if (screenWidth <= 768 && index >= 4) {
            elem.style.display = "none";
            refresh.style.display = "flex";

        } else if (screenWidth > 768) {
            elem.style.display = "flex";
            refresh.style.display = "none";
        }  

        elem.style.opacity = "0";
        setTimeout(() => elem.style.opacity = "1", 30)
    })
}

function load() {
    refresh.style.display = "none";
    items = document.querySelectorAll(".item");
    items.forEach((elem, index) => {
        if (index >= 4) {
            elem.style.opacity = "0";
            elem.style.display = "flex";
            setTimeout(() => elem.style.opacity = "1", 30)
        }
    })
}

function coffee() {
    btnCoffee.classList.add("active")

    grid.innerHTML = "";

    for (let i = 0; i < product.length; i++) {
        if (product[i].category === "coffee") {
            render(i);
        }
    }
    
    items = document.querySelectorAll(".item");
    screenWidth = window.innerWidth;
    count(items);
}

function tea() {
    grid.innerHTML = "";

    for (let i = 0; i < product.length; i++) {
        if (product[i].category === "tea") {
            render(i);
        }
    } 
    
    items = document.querySelectorAll(".item");
    screenWidth = window.innerWidth;
    count(items);
    refresh.style.display = "none"


}

function dessert() {
    grid.innerHTML = "";

    for (let i = 0; i < product.length; i++) {
        if (product[i].category === "dessert") {
            render(i);
        }
    }  

    items = document.querySelectorAll(".item");
    screenWidth = window.innerWidth;
    count(items);

}

btnCoffee.addEventListener("click", coffee)
btnTea.addEventListener("click", tea)
btnDessert.addEventListener("click", dessert)

refresh.addEventListener("click", load);


coffee()
















