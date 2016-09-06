var navigationPanels = document.getElementsByTagName('header');
var portfolioList = document.getElementsByClassName('portfolio__list')[0];
var portfolioMenu = document.getElementsByClassName('pmenu__list')[0];
var portfolioImages = portfolioList.getElementsByTagName('img');
var portfolioImageIndex = 0;

portfolioList.addEventListener("click", showPortfolio);
portfolioMenu.addEventListener("click", showPortfolio);

window.onscroll = function () {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    scrolled ? navigationPanels[0].classList.add('nav__scrolled') : navigationPanels[0].classList.remove('nav__scrolled');
}

function showPortfolio(event) {
    var target = event.target;

    while (target != 'UL') {
        if (target.tagName == 'A') {
            showPortfolioDialogBox(target);
            return;
        }
        target = target.parentNode;
    }
}

function showPortfolioDialogBox(target) {
    showModalWindow();

    var portfolioDialogBox = document.createElement('div');
    portfolioDialogBox.className = 'portfolioDialogBox';

    var portfolioDialogBox__Image = document.createElement('img');
    var portfolioDialogBox__buttonLeft = document.createElement('div');
    var portfolioDialogBox__buttonRight = document.createElement('div');

    if(target.className.toUpperCase() !== 'pmenu__link'.toUpperCase()){
        for(portfolioImageIndex=0; portfolioImageIndex < portfolioImages.length; portfolioImageIndex++){
            if(target.childNodes[1].src.toUpperCase()==portfolioImages[portfolioImageIndex].src.toUpperCase()){break}
        }
    }

    portfolioDialogBox__Image.src = portfolioImages[portfolioImageIndex].src;

    portfolioDialogBox__Image.className = "portfolioDialogBox__Image";
    portfolioDialogBox__buttonLeft.className = "portfolioDialogBox__buttonLeft";
    portfolioDialogBox__buttonRight.className = "portfolioDialogBox__buttonRight";

    portfolioDialogBox__buttonLeft.innerHTML = 'PREVIOUS';
    portfolioDialogBox__buttonRight.innerHTML = 'NEXT';

    portfolioDialogBox.appendChild(portfolioDialogBox__Image);
    portfolioDialogBox.appendChild(portfolioDialogBox__buttonLeft);
    portfolioDialogBox.appendChild(portfolioDialogBox__buttonRight);

    portfolioDialogBox__buttonLeft.addEventListener('click', showPreviousPortfolioImage);
    portfolioDialogBox__buttonRight.addEventListener('click', showNextPortfolioImage);

    document.body.appendChild(portfolioDialogBox);
}

function removePortfolioDialogBox() {
    removeModalWindow();

    var portfolioDialogBox = document.getElementsByClassName('portfolioDialogBox')[0];
    var portfolioDialogBox__buttonLeft = document.getElementsByClassName('portfolioDialogBox__buttonLeft')[0];
    var portfolioDialogBox__buttonRight = document.getElementsByClassName('portfolioDialogBox__buttonRight')[0];

    portfolioDialogBox__buttonLeft.removeEventListener('click', showPreviousPortfolioImage);
    portfolioDialogBox__buttonRight.removeEventListener('click', showNextPortfolioImage);

    document.body.removeChild(portfolioDialogBox);
}

function showPreviousPortfolioImage(){

}

function showNextPortfolioImage(){

}

function showModalWindow(){
    var modalWindow = document.createElement('div');
    var modalWindowCloseButton = document.createElement('div');

    modalWindow.className = "modalWindow";
    modalWindowCloseButton.className = "modalWindow__closeButton";

    modalWindow.appendChild(modalWindowCloseButton);
    document.body.appendChild(modalWindow);

    modalWindow.addEventListener("click", removePortfolioDialogBox);
    modalWindowCloseButton.addEventListener("click", removePortfolioDialogBox);

    disableScroll();
}

function removeModalWindow(){
    var modalWindow = document.getElementsByClassName('modalWindow')[0];
    var modalWindowCloseButton = document.getElementsByClassName('modalWindow__closeButton')[0];

    modalWindow.removeEventListener("click", removePortfolioDialogBox);
    modalWindowCloseButton.removeEventListener("click", removePortfolioDialogBox);

    document.body.removeChild(modalWindow);

    enableScroll();
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}