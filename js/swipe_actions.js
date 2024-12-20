/* REQUIRES: index_cal_conv.js */

/*
*  CODE FROM: https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
*  BY: https://stackoverflow.com/users/7852/givanse
*/

document.getElementById("main_div").addEventListener('touchstart', handleTouchStart, false);
document.getElementById("main_div").addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function previous() {
    if (view == 1) {
        show_content(4);
    }
    else if (view > 0) {
        show_content(view - 1);
    }
    else {
        show_content(1);    
    }
}

function next() {
    if (view == 4) {
        show_content(1);
    }
    else if (view < 4) {
        show_content(view + 1);
    }
    else {
        show_content(4);    
    }
}

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            next();
        } else {
            /* right swipe */
            previous();
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            // alert("up_swipe");
        } else {
            /* down swipe */
            // location.reload()
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
