var scevent = new CustomEvent( "scroll" );			
document.body.dispatchEvent( scevent );

var linkElems = document.querySelectorAll( 'a.anchor' );
if ( linkElems != null ) {
	for ( var linkEl of linkElems ) {
		linkEl.addEventListener( 'click', function ( e ) {
			e.preventDefault();
			let _this = e.target;
			//_this.offs = _this.getAttribute("data-offset-scroll") != null ? _this.getAttribute("data-offset-scroll") : null;
            var targetElem = document.querySelector( _this.hash );
            if ( targetElem != null ) {
    			scrollToY( null, null, null, _this.hash, null );
            }
		}, false );
	}
}

window.addEventListener( 'scroll', function ( e ) {

    if ( window.scrollY > window.innerHeight - 100 )
        document.body.classList.add( 'scrolled' );
    else
    	document.body.classList.remove( 'scrolled' );

}, true );