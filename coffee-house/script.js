const slides = document.querySelectorAll(".product");
const progress = document.querySelectorAll(".progress");
const rArrow = document.querySelector(".r-arrow");
const lArrow = document.querySelector(".l-arrow");
const coffee = document.querySelectorAll(".coffee-slider");



// slides.forEach((elem, index) => {
//     elem.style.transform = `translateX(${index * 100}%)`
// });

let currentSlide = 0;
let lastSlide = 2;


function update() {
    slides.forEach((elem, index) => {
        elem.style.transform = `translateX(${100 * (index - currentSlide)}%)`
    });

    progress.forEach((bar, index) => {
        if (index === currentSlide) {
            bar.style.animationName = "filling";
            bar.style.animationDuration = "5s";
        } else {
            bar.style.width = "0";
            bar.style.animationName = "empty";
            bar.style.animationDuration = "0.2s";
        }
    });
}

function right() {  
    if (currentSlide === lastSlide) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }

    update();

};

function left(){
    if (currentSlide === 0) {
        currentSlide = lastSlide;
    } else {
        currentSlide--;
    }

    update();
};


rArrow.addEventListener("click", () => {
    clearInterval(id);
    clearTimeout(id2);
    clearTimeout(id3);
    right();
    id = setInterval(right, 5000);
});

lArrow.addEventListener("click", () => {
    clearInterval(id);
    clearTimeout(id2);
    clearTimeout(id3);
    left();
    id = setInterval(right, 5000);
});


// progress[currentSlide].addEventListener("animationend", right)

let id2;
let id3;

function pause() { 
    clearTimeout(id2);
    clearTimeout(id3);
    clearInterval(id);

    progress[currentSlide].style.animationPlayState = "paused";
    quot = 1 - (progress[currentSlide].offsetWidth / 40).toFixed(1);
    console.log(quot);
    
};

function move() {
    progress[currentSlide].style.animationPlayState = "running";
    
    id2 = setTimeout(right, (5000 * quot))
    id3 = setTimeout(function() {
        id = setInterval(right, 5000);
    }, (5000 * quot))
     
    console.log(5000 * quot)

};

coffee.forEach((elem) => {
    elem.addEventListener("mouseover", pause);
    elem.addEventListener("mouseout", move);
})

let id = setInterval(right, 5000);
update()









