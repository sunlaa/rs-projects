const burger = document.querySelector(".menu-burger");
const lineUp = document.querySelector(".line-up");
const lineBottom = document.querySelector(".line-bottom");
const menu = document.querySelector(".burger-wrap");
const links = document.querySelectorAll(".link-burger");

let isOpen = false;

function open() {
    if (isOpen) {
        lineUp.style.transform = "translateY(0) rotate(0)";
        lineBottom.style.transform = "translateY(0) rotate(0)";

        menu.style.left = "100%";

        document.documentElement.style.overflow = "visible";
    } else {
        document.documentElement.style.overflow = "hidden";

        lineUp.style.transform = "translateY(4.2px) rotate(45deg)";
        lineBottom.style.transform = "translateY(-4.2px) rotate(-45deg)";
    
        menu.style.left = "0";

    }

    isOpen = !isOpen;
   
}
links.forEach((elem) => {
    elem.addEventListener("click", function(e) {
        e.preventDefault();

        setTimeout(() => {
            window.location.href = elem.getAttribute('href');
        }, 500)
        open()
    })
})
burger.addEventListener("click", open)