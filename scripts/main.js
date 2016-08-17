var navigationPanels = document.getElementsByTagName('header');

window.onscroll = function() {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled){
        navigationPanels[0].classList.add('nav__scrolled');
    }else{
        navigationPanels[0].classList.remove('nav__scrolled')
    }
}