var navigationPanel = document.querySelector('.header');
var portfolioList = document.querySelector('.portfolio__list');
var portfolioMenu = document.querySelector('.pmenu__list');
var portfolioImages = portfolioList.getElementsByTagName('img');
var pImageCurrentIndex = 0;

portfolioList.addEventListener("click", showPortfolio);
portfolioMenu.addEventListener("click", showPortfolio);

window.onscroll = function () {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    scrolled ? navigationPanel.classList.add('nav__scrolled') : navigationPanel.classList.remove('nav__scrolled');
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

    var pImage = document.createElement('img');
    var pButtonLeft = document.createElement('div');
    var pButtonRight = document.createElement('div');

    if(target.childNodes[1]===undefined){
        pImage.src = portfolioImages[0].src
    }else{
        pImage.src = target.childNodes[1].src;
    }

    for(pImageCurrentIndex = 0; pImageCurrentIndex < portfolioImages.length; pImageCurrentIndex++){
        if(pImage.src.toLowerCase()==portfolioImages[pImageCurrentIndex].src.toLowerCase()){
            break;
        }
    }

    pImage.className = "portfolioDialogBox__Image";
    pButtonLeft.className = "portfolioDialogBox__buttonLeft";
    pButtonRight.className = "portfolioDialogBox__buttonRight";

    pButtonLeft.textContent = 'PREVIOUS';
    pButtonRight.textContent = 'NEXT';

    portfolioDialogBox.appendChild(pImage);
    portfolioDialogBox.appendChild(pButtonLeft);
    portfolioDialogBox.appendChild(pButtonRight);

    pButtonLeft.addEventListener('click', function() { showPreviousPortfolioImage(pImage); } );
    pButtonRight.addEventListener('click', function() { showNextPortfolioImage(pImage); } );

    document.body.appendChild(portfolioDialogBox);
}

function removePortfolioDialogBox() {
    removeModalWindow();

    var portfolioDialogBox = document.querySelector('.portfolioDialogBox');
    var pButtonLeft = portfolioDialogBox.querySelector('.portfolioDialogBox__buttonLeft');
    var pButtonRight = portfolioDialogBox.querySelector('.portfolioDialogBox__buttonRight');

    pButtonLeft.removeEventListener('click', showPreviousPortfolioImage);
    pButtonRight.removeEventListener('click', showNextPortfolioImage);

    document.body.removeChild(portfolioDialogBox);
}

function showPreviousPortfolioImage(pImage){

    if(pImageCurrentIndex==0){
        pImageCurrentIndex = portfolioImages.length -1;
    }else{
        pImageCurrentIndex--;
    }

    pImage.src = portfolioImages[pImageCurrentIndex].src;
}

function showNextPortfolioImage(pImage){
    if(pImageCurrentIndex == portfolioImages.length -1){
        pImageCurrentIndex = 0;
    }else{
        pImageCurrentIndex++;
    }

    pImage.src = portfolioImages[pImageCurrentIndex].src;
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
    var modalWindow = document.querySelector('.modalWindow');
    var modalWindowCloseButton = document.querySelector('.modalWindow__closeButton');

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