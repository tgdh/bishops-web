$(function(){
	var html = $('html');

	var toggleClass = function(el, className) {
	    if(el.hasClass(className + '--open')) {
	      el.removeClass(className + '--open');
	    } else {
	      el.addClass(className + '--open');
	    }
	}

	$('[data-toggle]').on( "click", function() {
		var $className = $( this ).data("toggle");
		toggleClass(html, $className);
	});

	//scroll to
	$('a[href^="#"]').on('click', function(event) {
	    var target = $( $(this).attr('href') );
	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, 800);
	    }
	});

	//toggle search
	$('#toggleSearch').on('click', function(e) {
		e.preventDefault();
		if(!html.hasClass('search-form--open')) {
			html.addClass('search-form--open');
		}
	});

	//accordion
	$('.accordion__title').on( "click", function() {
		$(this).toggleClass('is-active').next('.accordion__copy').cssAnimateAuto();
	});

	//form toggle
	var html = $('html');
	$('#formSelector').find('.radio--form-selector').each(function() {
		var $this = $(this);

		$this.change(function(){
			if( $(this).is(':checked')) {
				var $this = $(this),
					$formName = $this.data("form-name"),
					$classes = $('html').attr('class').replace(/contour-form-name__[a-zA-Z0-9_]*--open$/g, '');
				$('html').attr('class', $classes)
				html.attr('class', $classes).addClass('contour-form-name__' + $formName + '--open');
			}

		});
		
	});

	//svg fallback
	if(!Modernizr.svg) {
	    $('img[src*="svg"]').attr('src', function() {
			var fallbackSrv = $(this).attr('data-fallback-src')
			$(this).attr("src", fallbackSrv);
		});
	}



	// specialist finishes carousel
	var specCover = function() {
		var carousel = $('.js-fixed-cover');

		carousel.owlCarousel({
			nav : true,
			items: 1,
			center: true,
			stagePadding: 100,
			dots:false,
			loop: true
		});

	}

	specCover();


// ===========================================================
//
//	$ANIMATE
//
// ===========================================================


// Helper: animate helper
	function animateEl(el, animation) {
	    el.bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
	    	var $this = $( this );
	        if (isInView) {
	            if (visiblePartY == 'top') {
	
	            } else if (visiblePartX == 'bottom') {
	
	            } else {
	                $this.addClass(animation);
	            }
	        }
	    });
	};

	$('.qualities__item').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$(this).removeClass('animated fadeInUp');
	});

	//Animations
	if (Modernizr.mq('only screen and (min-width: 37.5em)')) {

	    $('.qualities__item').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
	        if (isInView) {
	            if(visiblePartY != 'top' && visiblePartX != 'bottom') {
	            	$( this ).addClass('animated fadeInUp');
	            }
	        } 
	    });


	}


// ===========================================================
//
//	$PLUGINS
//
// ===========================================================
	$('.floatlabel').jvFloat();

	$('.owl-carousel.case-study').owlCarousel({
		nav : true,
		items: 1,
//		autoplay: true,
		dots:true,
		loop: true,
		animateOut: 'fadeOut'
	})


	//sam
	$('.owl-carousel.case-study').owlCarousel({
		nav : true,
		navText : ['<i class="ico-arrow-left"></i>', '<i class="ico-arrow-right"></i>'],
		items: 1,
		autoplay: false,
		dots:false,
		loop: true,
		animateOut: 'fadeOut'
	});

	//sam
	$('.owl-carousel.case-study--slider').owlCarousel({
		nav : true,
		navText : ['<i class="ico-arrow-left"></i>', '<i class="ico-arrow-right"></i>'],
		items: 1,
		itemElement: 'div',
		autoplay: false,
		//autoWidth: true,
		navContainerClass: 'case-study__controls',
		dots:false,
		loop: true,
		animateOut: 'fadeOut'
	})

	$('.gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		}
	});

});