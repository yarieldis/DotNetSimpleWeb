function initSlider( slEl ) {
	var sliderConts = document.querySelectorAll( slEl );
	if ( sliderConts != null ) {
		for ( var i = 0; i < sliderConts.length; i++ ) {
			var sliderContInst = sliderConts[i];
			var cant = document.body.querySelectorAll( '#' + sliderContInst.id + ' .slider-item' ).length;
			setTotalSlidesIndex( sliderContInst, cant );
			setCurrSlidePageIndex( sliderContInst, 1, direction = null );
			var cont = 1;
			for ( var k = 0; k < sliderContInst.children.length; k++ ) {
				var sliderControl = sliderContInst.children[k];
				if ( sliderControl.classList.contains( 'slider-item' ) ) {
					sliderControl.setAttribute( 'data-slide-index', cont );
					cont++;
				}
            }
            if ( sliderContInst.classList.contains( 'autoheight' ) ) {
                autoheight( sliderContInst );
            }
		}
	}
}

var sliderControls = document.querySelectorAll( '.slider-control[data-slider]' );
if ( sliderControls != null ) {
	for ( var i = 0; i < sliderControls.length; i++ ) {
		sliderControls[ i ].addEventListener( 'click', function ( e ) {
			var _target = e.target;
			_target = ! _target.classList.contains( 'slider-control' ) ? _target.closest( '.slider-control' ) : _target;
			var direction = _target.classList.contains( 'slider-control-next' ) ? 'next' : 'prev';
			var slider = document.querySelector( _target.getAttribute( 'data-slider' ) );
			var currSlideEl = slider.querySelector( '.slider-item.current' );
			if ( currSlideEl != null ) {
				currSlideEl.style.left = direction == 'next' ? '-100%' : '100%';
				if ( direction == 'next' ) {
					if ( currSlideEl.nextElementSibling != null ) {
						if ( currSlideEl.nextElementSibling.classList.contains( 'slider-item' ) )
							slideMove( slider, currSlideEl, 'next' );
					}
					else
						slideMove( slider, currSlideEl, 'first' );
				}
				if ( direction == 'prev' && currSlideEl.previousElementSibling != null ) {
					if ( currSlideEl.previousElementSibling.classList.contains( 'slider-item' ) ) {
						slideMove( slider, currSlideEl, 'prev' );
					}
				}
			}
			if ( slider != null && window.CustomEvent ) {
				var event = new CustomEvent( "sliderControl", {
					detail: {
						slider: slider,
						direction: direction,
					}
				} );			
				document.dispatchEvent( event );
			}
		}, false );
	}
}

function slideMove(slider, currSlideEl, direction) {
	currSlideEl.classList.remove( 'current' );
	switch ( direction ) {
		case 'next' :
			currSlideEl.nextElementSibling.classList.add( 'current' );
			break;
		case 'prev' :
			currSlideEl.previousElementSibling.classList.add( 'current' );
			break;
		case 'first' :
			var backToFirst = slider.querySelector( '.slider-item:first-of-type' );
			backToFirst.classList.add( 'current' );
			currSlideEl = 1; direction = null;
			break;
    }
    if ( slider.classList.contains( 'autoheight' ) ) {
        window.setTimeout( function ( slider ) { autoheight( slider ); }, 100, slider);
    }
	setCurrSlidePageIndex( slider, currSlideEl, direction );
}

function setTotalSlidesIndex( sliderInst, cant ) {
	var allTotals = document.querySelectorAll( '.all-slides' );
	if ( allTotals != null ) {
		for ( var j = 0; j < allTotals.length; j++ ) {
			var totItem = allTotals[j];
			if ( sliderInst.id == totItem.getAttribute( 'data-slider' ) )
				totItem.innerText = cant;
		}
	}
}

function setCurrSlidePageIndex( slider, sliderElem, direction = null ) {
	var allCurrs = document.querySelectorAll( '.curr-slide' );
	if ( allCurrs != null ) {
		for ( var l = 0; l < allCurrs.length; l++ ) {
			curItem = allCurrs[l];
			if ( slider.id == curItem.getAttribute( 'data-slider' ) ) {
				if ( sliderElem == 1 ) {
					curItem.innerText = 1;
				}
				else {
					curItem.innerText = direction == 'next' ? 
										sliderElem.nextElementSibling.getAttribute( 'data-slide-index' ) : 
										sliderElem.previousElementSibling.getAttribute( 'data-slide-index' );
				}
			}
		}
	}
}

function autoheight( sliderContInst ) {
    let current = sliderContInst.querySelector( '.current' );
    let finalHeight = 0;
    for ( let j = 0; j < current.children.length; j++ ) {
        let itemcurrent = current.children[ j ];
        finalHeight += itemcurrent.scrollHeight;
    }
    sliderContInst.style.height = finalHeight + 'px';
}

initSlider( '.slider' );

/*
** Test Slider
** Numero total de slides, debe tener la clase ".all-slides" y el atributo "data-slider" el ID del slider que representa
** Numero actual de slide, debe tener la clase ".curr-slide" y el atributo "data-slider" el ID del slider que representa
** Evento "sliderControl" desencadenado por los controles
*/