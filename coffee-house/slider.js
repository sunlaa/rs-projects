const slide = document.querySelector(".slide")
const sliderTrack = document.querySelector(".slider-track")
const slides = document.querySelectorAll(".product");
const progress = document.querySelectorAll(".progress");
const rArrow = document.querySelector(".r-arrow");
const lArrow = document.querySelector(".l-arrow");

let currentSlide = 0;
let lastSlide = 2;


function update() {

    let width = slides[0].offsetWidth;
    sliderTrack.style.transform = `translateX(-${currentSlide * width}px)`
    sliderTrack.style.transition = 'transform .5s';


    progress.forEach((bar, index) => {
        if (index === currentSlide) {
            bar.style.animationName = "filling";
            bar.style.animationDuration = "5s";
        } else {
            bar.style.width = "0";
            bar.style.animationName = "";
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


let id2;
let id3;
let quot;


function pause() { 
    clearTimeout(id2);
    clearTimeout(id3);
    clearInterval(id);

    progress[currentSlide].style.animationPlayState = "paused";
    quot = 1 - (progress[currentSlide].offsetWidth / 40).toFixed(1);
};

function move() {
    progress[currentSlide].style.animationPlayState = "running";
    
    id2 = setTimeout(right, (5000 * quot))
    id3 = setTimeout(function() {
        id = setInterval(right, 5000);
    }, (5000 * quot))
};

slides.forEach((elem) => {
    elem.addEventListener("mouseover", (e) => {
        pause();
        e.stopPropagation();
    });
    elem.addEventListener("mouseout", (e) => {
        move();
        e.stopPropagation();
    });
})

let startX = 0;
let current = 0;
let shift = 0;
let endX = 0;
let search = /[-0-9.]+(?=px)/;


function swipeStart(event) {
    pause();
    startX = current = event.touches[0].clientX;
    sliderTrack.style.transition = '';

    document.addEventListener("touchmove", swipeMove);
    document.addEventListener('touchend', swipeEnd);

}

function swipeMove(event) {
    let style = sliderTrack.style.transform;
    let transform = +style.match(search)[0];
    
    shift = current - event.touches[0].clientX;
    current = event.touches[0].clientX;

    sliderTrack.style.transform = `translateX(${transform - shift}px)`;
}

function swipeEnd(event) {
    move()
    endX = startX - current;

    document.removeEventListener('touchmove', swipeMove);
    document.removeEventListener('touchend', swipeEnd);

    if (Math.abs(endX) > 40) {
        if (startX > current) {
            right()
        } else if (startX < current) {
            left()
        }
    }

    if (startX != current) {
        update()
    }

}

slide.addEventListener("touchstart", swipeStart);
let id = setInterval(right, 5000);
update()









