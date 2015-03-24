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

	//cover contact buttons
	$('.button--cover').on( "click", function() {
		var $target = $( this ).data("form-target");
		$('#' + $target).prop('checked', true);
	});

	//svg fallback
	if(!Modernizr.svg) {
	    $('img[src*="svg"]').attr('src', function() {
			var fallbackSrv = $(this).attr('data-fallback-src')
			$(this).attr("src", fallbackSrv);
		});
		$('.logo').find('img[src*="svg"]').attr('src', function() {
			return $(this).attr('src').replace('.svg', '.png');
		});
	}

	// GA event: form submit
	$('#contour_form_Contact').find('input[type="submit"]').on('click', function() {
		ga('send', 'event', { eventCategory: 'Contact', eventAction: 'Information Request', eventLabel: 'Contact Form'})
	});

	//form validation
	var initFormValidation = function() {
		var $contactForm = $('#contour_form_Contact').find('form');

		$(".contact__submit").prop("disabled", true);

		$contactForm.find('.contact__submit').on('click', function () {
			$contactForm.parsley().validate();
			validateFront();
		});

		var validateFront = function () {
			if (true === $contactForm.parsley().isValid()) {
				$(".contact__submit").prop("disabled", false);
			} else {
				$(".contact__submit").prop("disabled", true);
			}
		};

		//fields = ['input[type="text"]','textarea'];
		fields = ['.input--validate', 'textarea'];
			$.each( fields, function (index, value) {
				$(value).on('keyup change blur', function (value) {
					return function (event) {
						$this = $(this);
						if (true === $this.parsley().isValid()) {
						    $this.addClass('input--valid');
							$this.removeClass('input--invalid');
						} else {
						    $this.addClass('input--invalid');
							$this.removeClass('input--valid');
						}
						validateFront();
					}
				}(value));
			});

	};
	initFormValidation();


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
	            	$this.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
						$(this).removeClass('pre-animate');
					});
	                $this.addClass(animation);
	            }
	        }
	    });
	};

	//Animations
	if (Modernizr.mq('only screen and (min-width: 37.5em)')) {

	    $('.qualities__item').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
	        if (isInView) {
	            if(visiblePartY != 'top' && visiblePartX != 'bottom') {
	            	$( this ).addClass('animated fadeInUp');
	            }
	        } 
	    });


	    animateEl( $('.qualities__item'), 'animated fadeInUp');
		animateEl( $('.work__img'), 'animated fadeInUp');

		animateEl( $('.leaflet-fold'), 'animated zoomIn');
		animateEl( $('.resource__img'), 'animated zoomIn');
		animateEl( $('.related__item'), 'animated zoomIn');

//		animateEl( $('.cover__copy'), 'animated fadeInLeft');


		$('.cover__copy').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
	    	var $this = $( this );
	    	var animation = 'animated fadeInLeft';
	        if (isInView) {
				$this.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
					$(this).removeClass('pre-animate');
				});
                $this.addClass(animation);
            }
	    });

	}

	var offCanvasCarousel = function() {

		var $carousel = $('.js-carousel--off-canvas');

		$carousel.owlCarousel({
			nav : true,
			navText : ['<i class="ico-arrow-left"></i>', '<i class="ico-arrow-right"></i>'],
			dots: false,
			loop: false,
			margin: 20,
			responsive:{
		        0:{
		            items:1,
		            stagePadding: 60
		        },
		        600:{
		           items: 2,
		           stagePadding: 80
		        },
		        1000:{
		            items: 3,
		            stagePadding: 80
		        }
		    }
		});

	}

// ===========================================================
//
//	$INIT
//
// ===========================================================

	offCanvasCarousel();
	$('.tooltip__marker').tooltipster({
		'theme': 'tooltipster-bishops'
	});


// ===========================================================
//
//	$PLUGINS
//
// ===========================================================
	$('.floatlabel').jvFloat();


	$('.owl-carousel.case-study').owlCarousel({
		nav : true,
		navText : ['<i class="ico-arrow-left"></i>', '<i class="ico-arrow-right"></i>'],
		items: 1,
		autoplay: false,
		dots:true,
		loop: true,
		animateOut: 'fadeOut'
	});


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