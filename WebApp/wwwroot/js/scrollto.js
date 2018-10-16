window.requestAnimFrame = ( function() {
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ) {
                window.setTimeout( callback, 1000 / 60 );
            };
} )();

function scrollToY( scrollTargetY, speed, easing, elemTarget = null, offsetScroll = null ) {

    if ( elemTarget != null ) {
        var selElem = document.querySelector( elemTarget );
        scrollTargetY = selElem.offsetTop;
    }
    
    scrollTargetY = offsetScroll != null ? parseFloat( scrollTargetY ) + parseFloat( offsetScroll ) : scrollTargetY;

    var scrollY = window.scrollY,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeInOutQuint',
        currentTime = 0;

    // min time .1, max time .8 seconds
    var time = Math.max( .1, Math.min( Math.abs( scrollY - scrollTargetY ) / speed, .8 ) );

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    var PI_D2 = Math.PI / 2,
        easingEquations = {
            easeOutSine: function ( pos ) {
                return Math.sin( pos * ( Math.PI / 2 ) );
            },
            easeInOutSine: function ( pos ) {
                return ( -0.5 * ( Math.cos( Math.PI * pos ) - 1 ) );
            },
            easeInOutQuint: function ( pos ) {
                if ( ( pos /= 0.5 ) < 1 ) {
                    return 0.5 * Math.pow( pos, 5 );
                }
                return 0.5 * ( Math.pow( ( pos - 2 ), 5 ) + 2 );
            }
        };

    function tick() {
        currentTime += 1 / 60;

        var p = currentTime / time;
        var t = easingEquations[easing](p);

        if ( p < 1 ) {
            requestAnimFrame( tick );
            window.scrollTo( 0, scrollY + ( ( scrollTargetY - scrollY ) * t ) );
        } else {
            window.scrollTo( 0, scrollTargetY );
        }
    }
    tick();
}