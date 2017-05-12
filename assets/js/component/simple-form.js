/*
$(function(){
	var $form 		= $('.js-simple-form'),
		$fields 	= $form.find('.contourField'),
		fieldCount	= $fields.size(),
		current		= 0;

		

	var init = function() {
		$form.addClass('s-simple-form');

		_setActive( current );
		_addControls();

		$($form).on( 'click', '.simple-form__next', _pageTo( current + 1 ) );
	};

	var _setActive = function( elNum ) {

		var el = $( $fields[ elNum ] );

		el.addClass('active');
		el.siblings().removeClass('active');

	};

	var _pageTo = function( i ) {

		if( i < fieldCount ) {
			_setActive( i );

			console.log( 'page to ' + i );

			current === i;
		}

	};

	var _createEl = function( tag, opt ) {
		var el = document.createElement( tag );

		if( opt ) {
			if( opt.cName ) {
				el.className = opt.cName;
			}
			if( opt.inner ) {
				el.innerHTML = opt.inner;
			}
			if( opt.appendTo ) {
				opt.appendTo.appendChild( el );
			}
		}
		return el;
	};

	var _addControls = function() {

		// ctrl wrap
		var $ctrlWrap 	= _createEl( 'div', { cName: 'simple-form__nav-wrap' } ),
			$ctrlNext	= _createEl( 'button', { cName: 'simple-form__next', inner: 'next', appendTo: $ctrlWrap } );

		$( $ctrlWrap ).appendTo( $form );

	}

	init();

});
*/