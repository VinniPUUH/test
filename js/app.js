window.onload = function () {

    'use strict';

    /* Scroll of slides and change dots-------------------------
    ----------------------------------------------*/

    let coordPointerDown;
    let dots = document.querySelectorAll(".dots__item");
    let scrollDownImg = document.querySelector(".scroll-down");

    /* Active dot after page refresh */
    let numberOfCurrentSlide = window.pageYOffset / document.documentElement.clientHeight;
    dots[numberOfCurrentSlide].classList.toggle("dots__item--active");


    document.body.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        if (e.button != 0) { return };
        coordPointerDown = e.pageY;
    });

    document.body.addEventListener("pointerup", function (e) {
        e.preventDefault();
        if (e.button != 0) { return };

        let coordPointerUp = e.pageY;
        let currentSlide = e.target.closest(".slide");
        let firstSlide = document.querySelector(".slide1");

        /* Scroll */
        if (coordPointerUp > coordPointerDown + 100) {

            currentSlide.previousElementSibling.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })

            /* Change dots */
            let index = currentSlide.dataset.numberSlide;

            if (dots[index - 1] == dots[0]) { return };
            dots[index - 1].classList.toggle("dots__item--active");
            dots[index - 2].classList.toggle("dots__item--active");

            /* Add scrollDownImg */
            if (currentSlide.previousElementSibling == firstSlide) {
                scrollDownImg.classList.remove("hide");
            }

        } else {

            /* Scroll */
            if (coordPointerUp < coordPointerDown - 100) {

                /* Remove scrollDownImg */
                if (currentSlide == firstSlide) {
                    scrollDownImg.classList.add("hide");
                }

                currentSlide.nextElementSibling.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })

                /* Change dots */
                let index = currentSlide.dataset.numberSlide;

                if (dots[index] == dots[dots.length]) { return };
                dots[index - 1].classList.toggle("dots__item--active");
                dots[index].classList.toggle("dots__item--active");
            }
        }
    })


    /* Slider ------------
    ------------------------------------------------ */

    let sliderBarIcon = document.querySelector(".slider__bar__img");
    let counterOfKeyPoints = 0;
    let counterOfSlides = 0;

    sliderBarIcon.addEventListener("pointerdown", function (e) {

        let sliderBar = document.querySelector(".slider__bar");
        let sliderItems = document.querySelectorAll(".slider__item");
        let sliderInner = document.querySelector(".slider__inner");

        sliderBarIcon.style.transition = "auto";

        /* Move pointer and items */

        function pointerMove(e) {

            let pointerPosition = e.pageX - sliderBar.getBoundingClientRect().left;
            if (pointerPosition < 0 || pointerPosition > sliderBar.getBoundingClientRect().width) { return };
            sliderBarIcon.style.left = pointerPosition + "px";

            sliderMove(pointerPosition);
        }

        /* Move items */

        function sliderMove(pointerPosition) {
            let numberOfKeyPoints = sliderItems.length - 1;
            let step = sliderBar.getBoundingClientRect().width / numberOfKeyPoints;
            let sliderItemWidth = sliderItems[0].getBoundingClientRect().width;

            if (pointerPosition > counterOfKeyPoints + step / 2) {
                if (counterOfSlides == sliderItems.length - 1) { return };
                counterOfSlides++;
                sliderInner.style.transform = "translateX(" + (-sliderItemWidth * counterOfSlides) + "px)";
                counterOfKeyPoints += step;
            } else {
                if (pointerPosition < counterOfKeyPoints - step / 2) {
                    if (counterOfSlides == 0) { return };
                    counterOfSlides--;
                    sliderInner.style.transform = "translateX(" + (-sliderItemWidth * counterOfSlides) + "px)";
                    counterOfKeyPoints -= step;
                }
            }
        }



        document.body.addEventListener("pointermove", pointerMove);

        document.body.addEventListener("pointerup", function () {
            sliderBarIcon.style.transition = "left 0.3s linear";
            sliderBarIcon.style.left = counterOfKeyPoints + "px";
            document.body.removeEventListener("pointermove", pointerMove);
            return;
        })

    });

}