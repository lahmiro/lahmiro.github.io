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

	//for touch device
	if (Modernizr.touch){
		$('.water').css("top", "5%");
	}
	
	//detect firefox
	var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
	if(isFirefox){
		console.log('firefox');
		$('.blue-circle').removeClass("mix-blend-mode");
	}

	//only fire scrollmagic on deskotop
	if (!Modernizr.touch) {
    
	//scrollmagic animation
	//home page
	var blueCircle = $('.blue-circle'),
		blueCircleContainer = $('.blue-circle-container'),
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
		body = $('body'),
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
	var body = $("body"); 

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
	lgView = {
		match: function(){
			console.log("large screen view matched");
		}
	};

	enquire.register(smScreen, smView);
	enquire.register(mdScreen, mdView);
	enquire.register(lgScreen, lgView);

	// detect if mobile browser. regex -> http://detectmobilebrowsers.com
	var isMobile = (function(a){return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
		
		// we'd only like to use iScroll for mobile...
	
});


