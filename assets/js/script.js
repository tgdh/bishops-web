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
		var $contactForm = $('#contour_form_Contact').find('form'),
			contactSubmit = $contactForm.find(':submit');
			
		contactSubmit.prop("disabled", true);

		contactSubmit.on('click', function () {
			$contactForm.parsley().validate();
			validateFront();
		});

		var validateFront = function () {
			if (true === $contactForm.parsley().isValid()) {
				contactSubmit.prop("disabled", false);
			} else {
				contactSubmit.prop("disabled", true);
			}
		};

		//fields = ['input[type="text"]','textarea'];
		fields = [ $contactForm.find('.input--validate'), $contactForm.find('textarea')];
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

	var fullViewModal = function() {

		var modal = $('.js-modal-image');
		if( Modernizr.mq('only screen and (max-width: 800px)') ){
			console.log("yes");
			modal.magnificPopup({
				type: 'image',
				removalDelay: 300,
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'mfp-no-margins mfp-with-fade', // class to remove default margin from left and right side
				callbacks: {
					open: function() {
							var self = this;
							self.wrap.on('click.pinhandler', 'img', function() {
							  self.wrap.toggleClass('mfp-force-scrollbars');
							});
						},
						beforeClose: function() {
							this.wrap.off('click.pinhandler');
							this.wrap.removeClass('mfp-force-scrollbars');
						}
				},
				image: {
					verticalFit: true
				}
			});
		} else {
			modal.magnificPopup({
				type: 'image',
				removalDelay: 300,
				closeOnContentClick: true,
				closeBtnInside: false,
				mainClass: 'mfp-no-margins mfp-with-fade', // class to remove default margin from left and right side
				image: {
					verticalFit: true
				}
			});
		}


	}


	var infographic = function() {

		/* count to plugin */
		$.fn.countTo = function(options) {
			// merge the default plugin settings with the custom options
			options = $.extend({}, $.fn.countTo.defaults, options || {});

			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(options.speed / options.refreshInterval),
				increment = (options.to - options.from) / loops;

			return $(this).each(function() {
				var _this = this,
					loopCount = 0,
					value = options.from,
					interval = setInterval(updateTimer, options.refreshInterval);

				function updateTimer() {
					value += increment;
					loopCount++;
					$(_this).html(value.toFixed(options.decimals));

					if (typeof(options.onUpdate) == 'function') {
						options.onUpdate.call(_this, value);
					}

					if (loopCount >= loops) {
						clearInterval(interval);
						value = options.to;

						if (typeof(options.onComplete) == 'function') {
							options.onComplete.call(_this, value);
						}
					}
				}
			});
		};

		$.fn.countTo.defaults = {
			from: 0,  // the number the element should start at
			to: 100,  // the number the element should end at
			speed: 1000,  // how long it should take to count between the target numbers
			refreshInterval: 100,  // how often the element should be updated
			decimals: 0,  // the number of decimal places to show
			onUpdate: null,  // callback method for every time the element is updated,
			onComplete: null,  // callback method for when the element finishes updating
		};

		if( html.hasClass('Infographic') ) {

			$('.js-fig__val').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if (isInView) {
					if(visiblePartY != 'top' && visiblePartX != 'bottom') {
						
						var this = $(this),
							targetNum = $(this).data('to');

						$(this).countTo({
							from: 0,
							to: targetNum,
							speed: 1000,
							refreshInterval: 50,
							onComplete: function(value) {
			//						console.debug(this);
							}
						});

					}
				} 

				animateEl( $('.graphic--envelopes'), 'animate');
			});

		}

	}

	// specialist finishes carousel
	var specCover = function() {
		var carousel = $('.js-fixed-cover');

		carousel.owlCarousel({
			nav : true,
			items: 1,
			center: true,
			dots:false,
			loop: true,
			nav: false,
			autoplay: true,
			smartSpeed: 800,
			responsive : {
			    0 : {
			        stagePadding: 60
			    },
			    600 : {
			    	stagePadding: 120
			    },
			    1200 : {
			    	stagePadding: 250
			    },
			    1300 : {
			    	stagePadding: 300
			    },
			    1400 : {
			    	stagePadding: 340
			    },
			    1500 : {
			    	stagePadding: 360
			    },
			    1620 : {
			    	stagePadding: 400
			    },
			    1700 : {
			    	stagePadding: 420
			    },
			    1800 : {
			    	stagePadding: 450
			    },
			    1900 : {
			    	stagePadding: 470
			    }
			}
		});

	}

	// 
	var caseStudyScripts = function() {
		var carousel = $('.js-case-study');

		carousel.owlCarousel({
			nav : true,
			navText : ['<i class="ico-arrow-left"></i>', '<i class="ico-arrow-right"></i>'],
			items: 1,
			autoplay: false,
			autoHeight: true,
			dots:true,
			loop: true
		});

	}

	var positionPage = function() {
		var target = $( window.location.hash );

		if( target.length > 0 ) {
			$('html, body').scrollTop( target.offset().top - $('#header').height() );
		}

	}


	var simpleForm = function() {

		var $stepsForm = document.querySelector('.js-simple-form');

		new stepsForm( $stepsForm, {
			onSubmit : function( form ) {
				// hide form
				classie.addClass( $stepsForm.querySelector( '.contourPage' ), 'hide' );

				/*
				form.submit()
				or
				AJAX request (maybe show loading indicator while we don't have an answer..)
				*/
/*
				// let's just simulate something...
				var messageEl = $stepsForm.querySelector( '.s-simple-form__final-message' );
				messageEl.innerHTML = 'Thank you! We\'ll be in touch.';
				classie.addClass( messageEl, 'show' );
*/				
			}
		});

	};

// ===========================================================
//
//	$INIT
//
// ===========================================================

	offCanvasCarousel();
	$('.tooltip__marker').tooltipster({
		'theme': 'tooltipster-bishops'
	});

	$(document).ready(function() {

		fullViewModal();
		infographic();
		specCover();
		

		if (Modernizr.mq('only screen and (min-width: 37.5em)')) {
			$('#header').scrollToFixed();
		}

		positionPage();

		if( html.hasClass('SpecialistFinishResource') ) {
			simpleForm();
		}

	});

	$( window ).load(function() {

		caseStudyScripts();
		positionPage();

	});


// ===========================================================
//
//	$PLUGINS
//
// ===========================================================
	$('.floatlabel').jvFloat();

	$('.gallery, .js-gallery').each(function() {
		$(this).magnificPopup({
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

});