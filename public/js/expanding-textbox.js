/**
 * Created by nicholas on 03/10/15.
 */

var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on' + event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}


var textBoxes = document.getElementsByClassName("expanding-text");

var i;
for (i = 0; i < textBoxes.length; i++) {

    function resize() {
        textBoxes[i].style.height = 'auto';
        textBoxes[i].style.height = textBoxes[i].scrollHeight + 'px';
        textBoxes[i].style.overflow = 'hidden'
    }

    /* 0-timeout to get the already changed textBoxes[i] */
    function delayedResize() {
        window.setTimeout(resize, 0);
    }

    observe(textBoxes[i], 'change', resize);
    observe(textBoxes[i], 'cut', delayedResize);
    observe(textBoxes[i], 'paste', delayedResize);
    observe(textBoxes[i], 'drop', delayedResize);
    observe(textBoxes[i], 'keydown', delayedResize);
    textBoxes[i].focus();
    textBoxes[i].select();
    resize();
}