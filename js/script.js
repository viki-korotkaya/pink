"use strict";
(function() {
	var openMenu = document.querySelector(".btn-open-menu");
	openMenu.addEventListener("click", function(){
		if (!document.querySelector(".main-nav__toggle").classList.contains("main-nav__toggle--open-menu")) {
			document.querySelector(".main-nav__toggle").classList.add("main-nav__toggle--open-menu");
			openMenu.classList.add("main-nav__toggle-menu--close");
			document.querySelector(".main-nav__list").style.display = 'block';
		} else {
			document.querySelector(".main-nav__toggle").classList.remove("main-nav__toggle--open-menu");
			openMenu.classList.remove("main-nav__toggle-menu--close");
			document.querySelector(".main-nav__list").style.display = 'none';
		}
	});
})();

function currentSlide(n) {
    switch (n) {
        case 1:
           document.querySelector(".price__table-wrap").style.left = "8vw";
            break;
        case 2:
            document.querySelector(".price__table-wrap").style.left = "-87vw";
            break;
        case 3:
            document.querySelector(".price__table-wrap").style.left = "-178vw";
            break;
        };
                
        var dots = document.querySelectorAll("span.dot");
        for (var i = 0; i < dots.length; i++) {
            dots[i].classList.remove("slider__pagination-active");
        }
        dots[n-1].classList.add("slider__pagination-active");
}