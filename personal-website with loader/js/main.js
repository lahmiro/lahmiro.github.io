$(function(){
	var body = $('body');
	var blueCircle = $('.blue-circle');

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

	//for touch device
	if (Modernizr.touch){
		$('.water').css("top", "5%");
		$('#loader-wrapper').css("display", "none");
	}
	
	//detect firefox
	var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
	if(isFirefox){
		console.log('firefox');
		blueCircle.attr("class", "no-mix-blend-mode");
		$('#loader-wrapper').css("display", "none");
	}

	//only fire scrollmagic on deskotop
	if (!Modernizr.touch) {

	//loader
   
        setTimeout(function(){
			body.addClass('loaded');
		}, 1500);
    


	//scrollmagic animation
	//home page
	var blueCircleContainer = $('.blue-circle-container'),
		snowMountain = $('.snow-mountain'),
		rects01 = $('#rects-01'),
		rects02 = $('#rects-02'),
		rects03 = $('#rects-03'),
		arrow = $('.arrow'),
		home = $('#home'),
		about = $('#about'),
		skills = $('#skills'),
		homeTitle = $('.home-title'),
		homeName = $('.home-name'),
		introTitle = $('.intro-title'),
		introText = $('.intro-text'),
		loaderLine = $('.loader-line'),
		tiltMountain = $('.tilt-mountain'),
		intro = $('.intro-container');

	//on Leave controller
	var onLeaveCtrl = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });

	//onEnter controller
	var onEnterCtrl = new ScrollMagic.Controller({
		globalSceneOptions: {
            triggerHook: 'onEnter'
        }
	});

	//onCenter controller
	var onCenterCtrl = new ScrollMagic.Controller({
		globalSceneOptions: {
            triggerHook: 'onCenter'
        }
	});
	
	//home page anim when pinnning
	var homeAni = new TimelineMax();
		homeAni.to([snowMountain, blueCircleContainer], 3, {y:380, ease: Power1.easeOut}, 0)
				.to([homeTitle, homeName], .5, {opacity:0, ease: Power0.easeNone},0)
				.to(rects02, 2, {y:-40, opacity: 0, ease: Power1.easeOut}, 0)
				.to(rects01, 1, {y:-30, opacity: 0, ease: Power1.easeOut}, 0)			
				.to(snowMountain, 1, {opacity:0, ease: Power1.easeOut}, 0)
				.to(blueCircle, 1, {fill:"#fff568"}, 0)
				.to(arrow, 1, {y:-40, opacity:0, ease: Power1.easeOut},0);


	new ScrollMagic.Scene({
	  		triggerElement: "#home",
	  		duration: '70%'
		})
		.setTween(homeAni)
		.addTo(onLeaveCtrl);

	//about page title and squears and floating rects
	var aboutPageText = new TimelineMax();
		aboutPageText.staggerFrom([introTitle, rects03, introText], 3, {y:-40, autoAlpha:0, clearProps:'all'}, 1);

	var floatingRects = new TimelineMax({repeat: -1, delay: 3, smoothChildTiming: true});
	floatingRects.set('.f-rects', {opacity:0})
				 .staggerTo('.f-rects', 2, {y: -50, opacity:1, ease: Expo.easeOut}, .4)
				 .staggerTo('.f-rects',2,{y: 20, opacity:0},.4);

	var aboutPage = new TimelineMax();
		aboutPage.add(aboutPageText)
				 .add(floatingRects, 1);

	new ScrollMagic.Scene({
	  		triggerElement: "#about",
	  		duration: '50%'
		})
		.setTween(aboutPageText)
		.addTo(onCenterCtrl);

	//about page intro text fades out
	var introTextFadeOut = new TweenMax([introTitle, introText], 4, {opacity:0, y: -50, delay: 2, ease: Power1.easeOut},0);
		
	new ScrollMagic.Scene({
		offset: 200,
		triggerElement: "#skills",
		duration: 300
	})
		.setTween(introTextFadeOut)
		.addTo(onEnterCtrl);

	//skills page anim
	var drops = $('.circle-drop-container');
	var dropSvg = $('.drop');
	var water = $('.water');
	var bottleText = $('.fu-text');
	var skillsTitle = $('.skills-title');
	var rects04 = $('#rects-04');
	//chagne drop shape
	var changedDropPath = "M201.543,205.535c0,55.229-44.771,100-100,100s-100-44.771-100-100s100-199.229,100-199.229 S201.543,150.306,201.543,205.535z";
	
	//skills page drops anim
	var dropAnim = new TimelineMax();
		dropAnim.set(drops, {width: 100, height:100, left: "50%", xPercent: "-50%", y: -0.72*vh})
				.to(drops, 2, {y: 0, width: 30, height:30, left: "70%", xPercent: "-50%", ease: Power1.easeIn}, 0)
				.to(dropSvg, 1, {fill:"#6dcff6"}, 1)
				.from(skillsTitle, 1, {y:-50, opacity:0, clearProps:'all'}, 0.5)
				.to(dropSvg, 0.5, {attr: {d: changedDropPath}}, 1)
				.to(dropSvg, 1, {opacity:0})
				.to(water, 0.8, {top: "5%", ease: Power1.easeIn}, 1.4)
				.from(bottleText, 0.5, {opacity: 0, y: -10, ease: Elastic.easeOut.config(1, 0.3)}, 2);
				
	new ScrollMagic.Scene({
	  		triggerElement: "#skills",
	  		duration: '60%'
		})
		.setTween(dropAnim)
		.addTo(onCenterCtrl);

	//portfolio page
	//menu hover effect
    $('.portfolio-cat-hv').on({
	  mouseenter: function () {
	    var portfolioCat = TweenMax.to($('.arrow-up', this), 0.3, {borderBottomColor: "#fff", rotation: 90, ease: Power1.easeOut});
     	return portfolioCat;
	  },
	  mouseout: function () {
	    var portfolioCatRt = TweenMax.to($('.arrow-up', this), 0.3, {borderBottomColor: "#545863", rotation: 0, ease: Power1.easeOut});
     	return portfolioCatRt;
	  }
	});
	
	var portfolioTitle = new TimelineMax();
		portfolioTitle.staggerFrom('.portfolio-title > div', 2, {y: -40, opacity:0, ease: Power1.easeOut, clearProps:'all'}, 0.5);

	var portfolioCat = new TimelineMax();
		portfolioCat.staggerFrom('.portfolio-cat', 2, {y: 40, opacity:0, ease: Power1.easeOut, clearProps:'all'}, 0.5);

	var portfolioPage =  new TimelineMax();
		portfolioPage.add(portfolioTitle,0)
					 .add(portfolioCat,0.5);

	new ScrollMagic.Scene({
	  		triggerElement: "#portfolio",
	  		reverse: false,
	  		duration: '40%'
		})
		.setTween(portfolioPage)
		.addTo(onCenterCtrl);

	//design page left column
	var designCat = new TimelineMax();
		designCat.staggerFrom('.design-item', 11, {rotation: 360, xPercent: 500, ease: Power4.easeOut}, .3);
	
	var catMenuLf = new TimelineMax();
		catMenuLf.staggerFrom('.cat-menu-left > ul> li', 4, {xPercent: -20, autoAlpha:0, ease: Power1.easeOut}, 1);

	var designPage = new TimelineMax();
		designPage.from('#design', 7, {xPercent: -100, ease: Sine.easeOut, clearProps: "all"}, 0)
				  .from('.design-title', 3,{xPercent: -20, autoAlpha: 0, ease: Power1.easeOut}, 4.5)
				  .add(designCat, 1)
				  .add(catMenuLf, 5.5);

	new ScrollMagic.Scene({
	  		triggerElement: "#design",
	  		reverse: false,
	  		duration: '50%'
		})
		.setTween(designPage)
		.addTo(onCenterCtrl);
    

	//photography page right column
	var photoThumbs = new TimelineMax();
		photoThumbs.staggerFrom('.photo', 6, {autoAlpha: 0, xPercent: 50, ease: Power1.easeOut}, .3);

	var catMenuRt = new TimelineMax();
		catMenuRt.staggerFrom('.cat-menu-right > ul> li', 4, {xPercent: 20, autoAlpha:0, ease: Power1.easeOut}, 1); 

	var photoPage = new TimelineMax();
		photoPage.from('#photography', 6, {xPercent: 100, ease: Sine.easeOut, clearProps: "all"}, 0)
				 .from('.photography-title', 3, {xPercent: 20, autoAlpha:0, ease: Power1.easeOut}, 4)
				 .add(photoThumbs, 2)
				 .add(catMenuRt, 5);

	new ScrollMagic.Scene({
	  		triggerElement: "#photography",
	  		reverse: false,
	  		duration: '50%'
		})
		.setTween(photoPage)
		.addTo(onCenterCtrl);

	//videos page
	var catMenuLf02 = new TimelineMax();
		catMenuLf02.staggerFrom('.cat-menu-left-video > ul> li', 3, {xPercent: -20, autoAlpha:0, ease: Power1.easeOut}, 1);

	var videosPage = new TimelineMax();
		videosPage.from('#videos', 7, {xPercent: -100, ease: Sine.easeOut, clearProps: "all"}, 0)
				  .from('#video-carousel', 7, {xPercent: 150, ease: Power1.easeOut}, 1.5)
				  .from('.videos-title', 3, {xPercent: -20, autoAlpha: 0, ease: Power1.easeOut}, 4)
				  .add(catMenuLf02, 5);

	new ScrollMagic.Scene({
	  		triggerElement: "#videos",
	  		reverse: false,
	  		duration: '50%'
		})
		.setTween(videosPage)
		.addTo(onCenterCtrl);
    
	//painting page
	var paintingThumbsUp = new TimelineMax();
		paintingThumbsUp.staggerFrom('.painting-img-row:nth-child(odd)', 6, {autoAlpha: 0, yPercent: 15, ease: Power1.easeOut}, .3);
	var paintingThumbsDown = new TimelineMax();
		paintingThumbsDown.staggerFrom('.painting-img-row:nth-child(even)', 6, {autoAlpha: 0, yPercent: -15, ease: Power1.easeOut}, .3);

	var catMenuRt02 = new TimelineMax();
		catMenuRt02.staggerFrom('.cat-menu-right-painting > ul> li', 3, {xPercent: 20, autoAlpha:0, ease: Power1.easeOut}, 1); 

	var paintingPage = new TimelineMax();
	 	paintingPage.from('#painting', 7, {xPercent: 100, ease: Sine.easeOut, clearProps: "all"}, 0)
				 .from('.painting-title', 3, {xPercent: 20, autoAlpha:0, ease: Power1.easeOut}, 4)
				 .add(paintingThumbsUp, 3)
				 .add(paintingThumbsDown, 3)
				 .add(catMenuRt02, 5);

	new ScrollMagic.Scene({
	  		triggerElement: "#painting",
	  		reverse: false,
	  		duration: '50%'
		})
		.setTween(paintingPage)
		.addTo(onCenterCtrl);

	//contact page
	var contactPage = new TimelineMax();
		contactPage.from('.contact-form-container', 3, {autoAlpha:0, xPercent: 100, ease: Power1.easeOutc, learProps: "all"}, 0)
					.from('.social-media', 3, {autoAlpha:0, xPercent: -100, ease: Power1.easeOut, clearProps: "all"}, 0);

    new ScrollMagic.Scene({
	  		triggerElement: "#contact",
	  		reverse: false,
	  		duration: '100%'
		})
		.setTween(contactPage)
		.addTo(onEnterCtrl);

	
	}
	//imagelightbox js
	/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
	*/
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

			//	WITH OVERLAY & ACTIVITY INDICATION

			$( 'a[data-imagelightbox="b"]' ).imageLightbox(
			{
				onStart: 	 function() { overlayOn(); },
				onEnd:	 	 function() { overlayOff(); activityIndicatorOff(); },
				onLoadStart: function() { activityIndicatorOn(); },
				onLoadEnd:	 function() { activityIndicatorOff(); }
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


	//photo-thumbs hover 
	$(' .photo-thumbs > li ').each( function() { $(this).hoverdir(); } );

	
	//anchor scrolling
	$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1500);
        return false;
      }
    }
  });

	//vertical center 
	$('.vcenter').flexVerticalCenter();


	//video resizing and carousel
	$('#video-carousel').fitVids();
	$("#video-carousel").owlCarousel({
		slideSpeed: 400,
		paginationSpeed : 400,
      	singleItem:true

	});

	//disable controller for mobile and tablet view

	//media mobile/tablet/large screen
	var smScreen = "screen and (max-width: 768px)",
		mdScreen = "screen and (max-width: 992px)",
		lgScreen = "screen and (min-width: 1200px)";
	

	smView = {
		match: function(){
			console.log("mobile view matched");		
			$("circle.blue-circle").attr('r', "110" );
			$('#nav-bg').css({"border-right-width": vw});
		}
	},
	mdView = {
		match: function(){
			console.log("tablet view matched");
			$("circle.blue-circle").attr('r', "130" );
			$(".reset-right-column").removeClass("col-md-push-8").addClass("col-sm-12");
			$(".reset-left-column").removeClass("col-md-pull-4").addClass("col-sm-12");

		}
	},

	enquire.register(smScreen, smView);
	enquire.register(mdScreen, mdView);

	
});


