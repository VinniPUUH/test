window.onload = function () {

    'use strict';

    /* Scroll of slides -------------------------
    ----------------------------------------------*/

    let coordMouseDown;
    let dots = document.querySelectorAll(".dots__item");
    let scrollDownImg = document.querySelector(".scroll-down");

    document.body.addEventListener("mousedown", function (e) {
        e.preventDefault();
        if (e.button != 0) { return };
        coordMouseDown = e.pageY;
    });

    document.body.addEventListener("mouseup", function (e) {
        e.preventDefault();
        if (e.button != 0) { return };

        let coordMouseUp = e.pageY;
        let currentSlide = e.target.closest(".slide");
        let firstSlide = document.querySelector(".slide1");

        /* Scroll */
        if (coordMouseUp > coordMouseDown) {
            let index = currentSlide.dataset.numberSlide;

            currentSlide.previousElementSibling.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })

            /* Change dots */
            if (dots[index - 1] == dots[dots.length - dots.length]) { return };
            dots[index - 1].classList.toggle("dots__item--active");
            dots[index - 2].classList.toggle("dots__item--active");

            /* Add scrollDownImg */
            if (currentSlide.previousElementSibling == firstSlide) {
                scrollDownImg.classList.remove("hide");
            }

        } else {

            /* Scroll */
            if (coordMouseUp < coordMouseDown) {
                let index = currentSlide.dataset.numberSlide;

                /* Remove scrollDownImg */
                if (currentSlide == firstSlide) {
                    scrollDownImg.classList.add("hide");
                }

                currentSlide.nextElementSibling.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })

                /* Change dots */
                if (dots[index - 1] == dots[dots.length - 1]) { return };
                dots[index - 1].classList.toggle("dots__item--active");
                dots[index].classList.toggle("dots__item--active");
            }
        }
    })


    /* Slider ------------
    ------------------------------------------------ */

    let sliderBar = document.querySelector(".slider__bar__img");
    let sliderItems = document.querySelectorAll(".slider__item");
    let sliderInner = document.querySelector(".slider__inner");
    let counter = 0;

    sliderBar.ondragstart = function() {
        return false;
      };

    sliderBar.addEventListener("touchstart", function(){

        function pointerMove (event) {
            console.log("work");
            console.log(event.pageX);
            sliderBar.style.left = event.pageX + "px"; 
        }

        document.body.addEventListener("touchmove", pointerMove,false);

        document.body.addEventListener("touchend", function(){
            console.log("work");
            document.body.removeEventListener("touchmove", pointerMove);
            return;
        }, false)

    },false);

    /* right.addEventListener("click", function(e){
        if (counter == sliderItems.length - 1) {return};
        counter++;
        sliderInner.style.transform = "translateX(" + `${-1024*counter}` + "px)";
    });

    left.addEventListener("click", function(e){
        if (counter == 0) {return};
        counter--;
        sliderInner.style.transform = "translateX(" + `${-1024*counter}` + "px)";
    }); */













    /*  let coordPointerDown, coordPointerUp;
 
     document.body.addEventListener("pointerdown", function(e){
         e.preventDefault();
         coordPointerDown = e.pageY;
         console.log(coordPointerDown)
     })
 
     document.body.addEventListener("pointerup", function(e){
         e.preventDefault();
         coordPointerUp = e.pageY;
         if (coordPointerUp > coordPointerDown){
             window.scrollBy(0, -768)
         } else {
             window.scrollBy(0, 768)
         }
         console.log(coordPointerUp, e.pageY, e.pageX, e.clientY)
     }) */


}