/**
 * Created by kameron on 22.09.2016.
 */
initSmoothScrolling();

function initSmoothScrolling() {
    var duration = 400;

    //var pageUrl = location.hash ?
    //    stripHash(location.href) :
    //    location.href;

    delegatedLinkHijacking();

    function delegatedLinkHijacking() {
        document.body.addEventListener('click', onClick, false);

        function onClick(e) {
            var linkHash = getLinkHash(e.target);
            if (linkHash == '')
                return;

            e.stopPropagation();
            e.preventDefault();

            jump(linkHash, {
                duration: duration
            });
        }
    }

    function getLinkHash(target) {

        while (target.tagName != 'BODY') {
            if (target.tagName == 'A') {
                return target.hash;
            }
            target = target.parentNode;
        }
        return '';

    }

    //function stripHash(url) {
    //    return url.slice(0, url.lastIndexOf('#'));
    //}
}

function jump(target, options) {

    var
        start = window.pageYOffset,
        opt = {
            duration: options.duration,
            offset: options.offset || 0,
            easing: options.easing || easeInOutQuad
        },
        distance = typeof target === 'string' ?
        opt.offset + document.querySelector(target).getBoundingClientRect().top :
            target,
        duration = typeof opt.duration === 'function' ?
            opt.duration(distance) :
            opt.duration,
        timeStart, timeElapsed;

    requestAnimationFrame(function(time) {
        timeStart = time;
        loop(time);
    });

    function loop(time) {
        timeElapsed = time - timeStart;

        window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));

        if (timeElapsed < duration)
            requestAnimationFrame(loop);
        else
            end();
    }

    function end() {
        window.scrollTo(0, start + distance);
    }

    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b
    }

}