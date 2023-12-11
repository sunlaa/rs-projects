import json from "./product.js";

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

let btnCloseModal;
let modalWind;
let backGray;



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

}

window.addEventListener("resize", () => {
    screenWidth = window.innerWidth;
    count(document.querySelectorAll(".item"));
})

let string
function count() {
    document.querySelectorAll(".item").forEach((elem, index) => {
        if (screenWidth <= 768 && index >= 4) {
            elem.style.display = "none";
            refresh.style.display = "flex";

        } else if (screenWidth > 768) {
            elem.style.display = "flex";
            refresh.style.display = "none";
        }  

        setTimeout(() => elem.style.opacity = "1", 30)

        elem.addEventListener("click", () => {
            string = elem.querySelector(".coffee-name").textContent;
            for (let i = 0; i < product.length; i++) {
                if (product[i].name === string) {
                    renderModal(i);
                }
            }

        })
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
    
    document.querySelectorAll(".item").forEach((elem) => elem.style.opacity = "0")
    screenWidth = window.innerWidth;
    count();
}

function tea() {
    grid.innerHTML = "";

    for (let i = 0; i < product.length; i++) {
        if (product[i].category === "tea") {
            render(i);
        }
    } 
    
    document.querySelectorAll(".item").forEach((elem) => elem.style.opacity = "0")
    screenWidth = window.innerWidth;
    count();
    refresh.style.display = "none"

}

function dessert() {
    grid.innerHTML = "";

    for (let i = 0; i < product.length; i++) {
        if (product[i].category === "dessert") {
            render(i);
        }
    }  

    document.querySelectorAll(".item").forEach((elem) => elem.style.opacity = "0")
    screenWidth = window.innerWidth;
    count();

}

btnCoffee.addEventListener("click", coffee)
btnTea.addEventListener("click", tea)
btnDessert.addEventListener("click", dessert)

refresh.addEventListener("click", load);


coffee()


function renderModal(i) {

    let modal = ` 
    <div class="modal">
        <div class="image-wraper"><img class="image" src="${product[i].image}" alt="${product[i].name}"></div>
        <div class="modal-description">
            <div class="modal-name">
                <div class="coffee-name">${product[i].name}</div>
                <div class="coffee-description">${product[i].description}</div>
            </div>
            <div class="size">
                <div class="coffee-description">Size</div>
                <div class="modal-tabs">
                    <a class="tab s">
                        <div class="emoji">S</div>
                        <span class="tab-text">${product[i].sizes.s.size}</span>
                    </a>
                    <a class="tab m">
                        <div class="emoji">M</div>
                        <span class="tab-text">${product[i].sizes.m.size}</span>
                    </a>
                    <a class="tab l">
                        <div class="emoji">L</div>
                        <span class="tab-text">${product[i].sizes.l.size}</span>
                    </a>
                </div>
            </div>
            <div class="add">
                <div class="coffee-description">Additives</div>
                <div class="modal-tabs">
                    <a class="tab">
                        <div class="emoji">1</div>
                        <span class="tab-text">${product[i].additives[0].name}</span>
                    </a>
                    <a class="tab">
                        <div class="emoji">2</div>
                        <span class="tab-text">${product[i].additives[1].name}</span>
                    </a>
                    <a class="tab">
                        <div class="emoji">3</div>
                        <span class="tab-text">${product[i].additives[2].name}</span>
                    </a>
                </div>
            </div>
            <div class="total-price">
                <span class="coffee-name">Total:</span><span class="coffee-name">$${product[i].price}</span>
            </div>
            <div class="warning">
                <svg class="warning-sign" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <g clip-path="url(#clip0_268_9737)">
                    <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_268_9737">
                        <rect width="16" height="16" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                <div class="warning-text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</div>
            </div>
            <a class="close-modal">Close</a>
        </div>
    </div>`

    document.querySelector(".modal-area").innerHTML = modal;
    document.querySelector(".overlay").classList.add("gray");

    backGray = document.querySelector(".gray")
    modalWind = document.querySelector(".modal");
    btnCloseModal = document.querySelector(".close-modal");

    modalWind.style.opacity = "0";
    modalWind.style.display = "flex";
    setTimeout(() => {
        modalWind.style.opacity = "1";
        backGray.style.opacity = "1";
    }, 30);
    
    function closeModal() {
        modalWind.style.opacity = "0";
        backGray.style.opacity ="0";

        setTimeout(() => {
            modalWind.style.display = "none";
            document.querySelector(".overlay").classList.remove("gray");
            document.querySelector(".modal-area").innerHTML = "";
        }, 600)
        
    }

    btnCloseModal.addEventListener("click", closeModal);
    backGray.addEventListener("click", closeModal);

    const sizeTabs = document.querySelectorAll(".size > .modal-tabs > .tab");
    document.querySelector(".tab.s").classList.add("active");
    const addTabs = document.querySelectorAll(".add > .modal-tabs > .tab");

    let pricePlace = document.querySelector(".total-price > :last-child");
    let price = +product[i].price;
    let sum;
    let totalAddPrice = 0;
    let totalSizePrice = 0;

    function changeSize(event) {
        sizeTabs.forEach((elem) => elem.classList.remove("active"));
        event.currentTarget.classList.add("active");

        let size = event.currentTarget.classList[1];
        let addPrice = +product[i].sizes[size]["add-price"];

        totalSizePrice = addPrice;
        
        updateTotal()

    }

    function changeAdd(event) {
        let target = event.currentTarget;
        target.classList.toggle("active");

        totalAddPrice = 0;
        addTabs.forEach((elem) => {
            if (elem.classList.contains("active")) {
                totalAddPrice += 0.5;
            }
        })

        updateTotal()
    }

    function updateTotal() {
        sum = price + totalAddPrice + totalSizePrice;
        pricePlace.textContent = `$${sum.toFixed(2)}`;
    }

    sizeTabs.forEach((elem) => {
        elem.addEventListener("click", changeSize);
    })

    addTabs.forEach((elem) => {
        elem.addEventListener("click", changeAdd)
    })
    
}



