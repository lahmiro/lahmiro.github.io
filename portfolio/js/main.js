$(function(){

	//nav toggle
	var sidebarBox = document.querySelector('#nav-box');
	var sidebarIcon = document.querySelector('#nav-icon');
	var pageWrapper = document.querySelector('.wrapper');
	var sidebarBg = document.querySelector('#nav-bg');
	var vh = $(window).height();
    var vw = $(window).width();

	sidebarIcon.addEventListener('click', function(event) {
			sidebarIcon.classList.toggle('active');
			sidebarBox.classList.toggle('active');
			sidebarBg.classList.toggle('active');
	});

	pageWrapper.addEventListener('click', function(event) {

			if (sidebarBox.classList.contains('active') && sidebarBg.classList.contains('active')) {
					sidebarIcon.classList.remove('active');
					sidebarBox.classList.remove('active');
					sidebarBg.classList.remove('active');
			}
	});

	window.addEventListener('keydown', function(event) {

			if (sidebarBox.classList.contains('active') && sidebarBg.classList.contains('active') && event.keyCode === 27) {
					sidebarIcon.classList.remove('active');
					sidebarBox.classList.remove('active');
					sidebarBg.classList.remove('active');
			}
	});
	//set nav bg as a full-height triangle
	$('#nav-bg').css({"border-right-width": vw*0.2, "border-top-width": vh});


	//define variables
	//var snowMountain = $('.snow-mountain');
	var blueCircle = $('.blue-circle');
	var snowMountain = $('.snow-mountain');
	var rects01 = $('#rects-01');
	var rects02 = $('#rects-02');
	var rects03 = $('#rects-03');
	var home = $('#home');
	var about = $('#about');
	var skills = $('#skills');
	var homeTitle = $('.home-title');
	var homeName = $('.home-name');
	var body = $('body');
	var introTitle = $('.intro-title');
	var introText = $('.intro-text');
	var loaderLine = $('.loader-line');
	var tiltMountain = $('.tilt-mountain');
	var intro = $('.intro-container');
	
	//on Leave controller
	var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });

	//onEnter controller
	var ctrl2 = new ScrollMagic.Controller({
		globalSceneOptions: {
            triggerHook: 'onEnter'
        }
	});

	//onCenter controller
	var ctrl3 = new ScrollMagic.Controller({
		globalSceneOptions: {
            triggerHook: 'onCenter'
        }
	});
	
	//home page anim when pinnning
	var homeAni = new TimelineMax()
		homeAni.to(home, 7, {y:530}, 0)
				.to(rects01, 4, {y:-80, opacity: 0}, 0)			
				.to(snowMountain, 6, {opacity:0}, 0)
				.to(blueCircle, 4, {fill:"#fff568"}, 0)
				.to(homeTitle, 2, {opacity:0, ease: Power0.easeNone},0)
				.to(homeName, 2, {opacity:0, ease: Power0.easeNone},0)
				.to(introTitle, 2, {rotationX:90}, "-=1")
				.from(introText, 4, {opacity: 0, y: -30, ease: Power4.easeNone})
				.from(rects03, 2, {opacity:0, y:-20, ease: Power4.easeNone})
				.to(home, 1, {display: "none"});

	new ScrollMagic.Scene({
	  		triggerElement: "#home",
	  		duration: '100%'
		})
		.setTween(homeAni)
		.setPin("#home")
		.addTo(ctrl)
		.addIndicators(); 

	//about page text fades out
	var fadeOut = new TimelineMax()
		fadeOut.to(introText, 3, {opacity:0, y: -30, delay: 2},0)
				.to(introTitle,3,{opacity:0, y:-30, delay: 2},0);
		
	new ScrollMagic.Scene({
		triggerElement: "#skills",
		duration: 200
	})
		//.setClassToggle("#about", "active")
		.setTween(fadeOut)
		.addTo(ctrl2)
		.addIndicators();

	//skills page anim
	var drops = $('.circle-drop-container');
	var dropSvg = $('.drop');
	var water = $('.water');
	var bottleText = $('.fu-text');
	var skillsTitle = $('.skills-title');
	var rects04 = $('#rects-04');
	//chagne drop shape
	var changedDropPath = "M201.543,205.535c0,55.229-44.771,100-100,100s-100-44.771-100-100s100-199.229,100-199.229 S201.543,150.306,201.543,205.535z";
	//TweenMax.to(changedDropShape, 3, {attr: {d: changedDropShape}});

	//drop anim
	var dropAnim = new TimelineMax()
		dropAnim.set(drops, {width: 100, height:100, left: "50%", xPercent: "-50%", y: -0.72*vh})
				.to(drops, 1, {y: 0, width: 30, height:30, left: "70%", xPercent: "-50%", ease: Power1.easeIn}, 0)
				.to(dropSvg, 0.5, {fill:"#6dcff6"}, 0.5)
				.from(skillsTitle, 1, {y:-50, opacity:0, ease: Power1.easeNone}, 0)
				.to(dropSvg, 0.5, {attr: {d: changedDropPath}}, 0.5)
				.to(dropSvg, 1, {opacity:0})
				.to(water, 0.8, {top: "5%", ease: Power1.easeIn}, 0.3)
				.from(bottleText, 0.5, {opacity: 0, y: -10, ease: Elastic.easeOut.config(1, 0.3)}, 1);
				
	new ScrollMagic.Scene({
	  		triggerElement: "#skills",
	  		duration: '50%'
		})
		.setTween(dropAnim)
		.addTo(ctrl3)
		.addIndicators(); 

	//portfolio categories changed shapes svg
	function ChangeCatShape() {
		var speed = 250,
			easing = mina.easeinout;

		[].slice.call ( document.querySelectorAll( '.portfolio-categories > a' ) ).forEach( function( el ) {
			var s = Snap( el.querySelector( 'svg' ) ), path = s.select( 'path' ),
				pathConfig = {
					from : path.attr( 'd' ),
					to : el.getAttribute( 'data-path-hover' )
				};

			el.addEventListener( 'mouseenter', function() {
				path.animate( { 'path' : pathConfig.to }, speed, easing );
			} );

			el.addEventListener( 'mouseleave', function() {
				path.animate( { 'path' : pathConfig.from }, speed, easing );
			} );
		} );
	}

	ChangeCatShape();

	$( 'a' ).imageLightbox();

	// ACTIVITY INDICATOR

		var activityIndicatorOn = function()
			{
				$( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
			},
			activityIndicatorOff = function()
			{
				$( '#imagelightbox-loading' ).remove();
			},


			// OVERLAY

			overlayOn = function()
			{
				$( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
			},
			overlayOff = function()
			{
				$( '#imagelightbox-overlay' ).remove();
			},


			// CLOSE BUTTON

			closeButtonOn = function( instance )
			{
				$( '<button type="button" id="imagelightbox-close" title="Close"></button>' ).appendTo( 'body' ).on( 'click touchend', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
			},
			closeButtonOff = function()
			{
				$( '#imagelightbox-close' ).remove();
			},


			// CAPTION

			captionOn = function()
			{
				var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img' ).attr( 'alt' );
				if( description.length > 0 )
					$( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
			},
			captionOff = function()
			{
				$( '#imagelightbox-caption' ).remove();
			},


			// NAVIGATION

			navigationOn = function( instance, selector )
			{
				var images = $( selector );
				if( images.length )
				{
					var nav = $( '<div id="imagelightbox-nav"></div>' );
					for( var i = 0; i < images.length; i++ )
						nav.append( '<button type="button"></button>' );

					nav.appendTo( 'body' );
					nav.on( 'click touchend', function(){ return false; });

					var navItems = nav.find( 'button' );
					navItems.on( 'click touchend', function()
					{
						var $this = $( this );
						if( images.eq( $this.index() ).attr( 'href' ) != $( '#imagelightbox' ).attr( 'src' ) )
							instance.switchImageLightbox( $this.index() );

						navItems.removeClass( 'active' );
						navItems.eq( $this.index() ).addClass( 'active' );

						return false;
					})
					.on( 'touchend', function(){ return false; });
				}
			},
			navigationUpdate = function( selector )
			{
				var items = $( '#imagelightbox-nav button' );
				items.removeClass( 'active' );
				items.eq( $( selector ).filter( '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ).index( selector ) ).addClass( 'active' );
			},
			navigationOff = function()
			{
				$( '#imagelightbox-nav' ).remove();
			},


			// ARROWS

			arrowsOn = function( instance, selector )
			{
				var $arrows = $( '<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>' );

				$arrows.appendTo( 'body' );

				$arrows.on( 'click touchend', function( e )
				{
					e.preventDefault();

					var $this	= $( this ),
						$target	= $( selector + '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ),
						index	= $target.index( selector );

					if( $this.hasClass( 'imagelightbox-arrow-left' ) )
					{
						index = index - 1;
						if( !$( selector ).eq( index ).length )
							index = $( selector ).length;
					}
					else
					{
						index = index + 1;
						if( !$( selector ).eq( index ).length )
							index = 0;
					}

					instance.switchImageLightbox( index );
					return false;
				});
			},
			arrowsOff = function()
			{
				$( '.imagelightbox-arrow' ).remove();
			};


		//	WITH ACTIVITY INDICATION

		$( 'a[data-imagelightbox="a"]' ).imageLightbox(
		{
			onLoadStart:	function() { activityIndicatorOn(); },
			onLoadEnd:		function() { activityIndicatorOff(); },
			onEnd:	 		function() { activityIndicatorOff(); }
		});


		//	WITH OVERLAY & ACTIVITY INDICATION

		$( 'a[data-imagelightbox="b"]' ).imageLightbox(
		{
			onStart: 	 function() { overlayOn(); },
			onEnd:	 	 function() { overlayOff(); activityIndicatorOff(); },
			onLoadStart: function() { activityIndicatorOn(); },
			onLoadEnd:	 function() { activityIndicatorOff(); }
		});


		//	WITH "CLOSE" BUTTON & ACTIVITY INDICATION

		var instanceC = $( 'a[data-imagelightbox="c"]' ).imageLightbox(
		{
			quitOnDocClick:	false,
			onStart:		function() { closeButtonOn( instanceC ); },
			onEnd:			function() { closeButtonOff(); activityIndicatorOff(); },
			onLoadStart: 	function() { activityIndicatorOn(); },
			onLoadEnd:	 	function() { activityIndicatorOff(); }
		});


		//	WITH CAPTION & ACTIVITY INDICATION

		$( 'a[data-imagelightbox="d"]' ).imageLightbox(
		{
			onLoadStart: function() { captionOff(); activityIndicatorOn(); },
			onLoadEnd:	 function() { captionOn(); activityIndicatorOff(); },
			onEnd:		 function() { captionOff(); activityIndicatorOff(); }
		});


		//	WITH ARROWS & ACTIVITY INDICATION

		var selectorG = 'a[data-imagelightbox="g"]';
		var instanceG = $( selectorG ).imageLightbox(
		{
			onStart:		function(){ arrowsOn( instanceG, selectorG ); },
			onEnd:			function(){ arrowsOff(); activityIndicatorOff(); },
			onLoadStart: 	function(){ activityIndicatorOn(); },
			onLoadEnd:	 	function(){ $( '.imagelightbox-arrow' ).css( 'display', 'block' ); activityIndicatorOff(); }
		});


		//	WITH NAVIGATION & ACTIVITY INDICATION

		var selectorE = 'a[data-imagelightbox="e"]';
		var instanceE = $( selectorE ).imageLightbox(
		{
			onStart:	 function() { navigationOn( instanceE, selectorE ); },
			onEnd:		 function() { navigationOff(); activityIndicatorOff(); },
			onLoadStart: function() { activityIndicatorOn(); },
			onLoadEnd:	 function() { navigationUpdate( selectorE ); activityIndicatorOff(); }
		});


		//	ALL COMBINED

		var selectorF = 'a[data-imagelightbox="f"]';
		var instanceF = $( selectorF ).imageLightbox(
		{
			onStart:		function() { overlayOn(); closeButtonOn( instanceF ); arrowsOn( instanceF, selectorF ); },
			onEnd:			function() { overlayOff(); captionOff(); closeButtonOff(); arrowsOff(); activityIndicatorOff(); },
			onLoadStart: 	function() { captionOff(); activityIndicatorOn(); },
			onLoadEnd:	 	function() { captionOn(); activityIndicatorOff(); $( '.imagelightbox-arrow' ).css( 'display', 'block' ); }
		});


			// Create a clone of the menu, right next to original.
		$('#nav-icon').addClass('original').clone().insertAfter('#nav-icon').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();

		scrollIntervalID = setInterval(stickIt, 10);


		function stickIt() {

		  var orgElementPos = $('.original').offset();
		  orgElementTop = orgElementPos.top;               

		  if ($(window).scrollTop() >= (orgElementTop)) {
		    // scrolled past the original position; now only show the cloned, sticky element.

		    // Cloned element should always have same left position and width as original element.     
		    orgElement = $('.original');
		    coordsOrgElement = orgElement.offset();
		    leftOrgElement = coordsOrgElement.left;  
		    widthOrgElement = orgElement.css('width');
		    $('.cloned').css('left',leftOrgElement+'px').css('top',0).css('width',widthOrgElement).show();
		    $('.original').css('visibility','hidden');
		  } else {
		    // not scrolled past the menu; only show the original menu.
		    $('.cloned').hide();
		    $('.original').css('visibility','visible');
		  }
		}

});


