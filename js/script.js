$(function(){
  // niceScroll
  $("html").niceScroll();
  
  //devise width
  var vw = $(window).width();
    
  // Stick menu
  $(".menu").sticky({topSpacing:0});

 //dropdown icon hover effect
 $('.menu-content li:nth-child(3) a').mouseenter(function(){
    $('.fa-caret-down').css("color", "#6dcff6");
 })
 .mouseleave(function(){
    $('.fa-caret-down').css("color", "#545863");
 });
 
$('a.mobile-dropdown').mouseenter(function(){
    $('.fa-caret-down').css("color", "#6dcff6");
 })
 .mouseleave(function(){
    $('.fa-caret-down').css("color", "#545863");
 });


 //portfolio-thumbs hover effect
  $(' .design > li ').each( function() { $(this).hoverdir(); } );

  //video resizing and carousel
  $('#video-carousel').fitVids();
  $("#video-carousel").owlCarousel({
    slideSpeed: 400,
    paginationSpeed : 400,
        singleItem:true

  });


  // Menu Scroll to content and Active menu
  var lastId,
    topMenu = $("#menu"),
    topMenuHeight = topMenu.outerHeight()+145,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

   $('a[href*=#]').bind('click', function(e) {
	e.preventDefault();
       
	var target = $(this).attr("href");
			

	$('html, body').stop().animate({ scrollTop: $(target).offset().top-140 }, 1000, function() {

	});
			
	return false;
   });

  $(window).scroll(function(){
   var fromTop = $(this).scrollTop()+topMenuHeight;
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop){
       return this;}
   });

   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }                   
  });  
  

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    
    $(".footer").css( "position", "relative" );
    $(".contact").css( "marginBottom", "0" );

}
else 
{

  // FadeTo elements
  if ( vw > 1023) {  

    var tiles = $(".read-more, .portfolio-subtitle, .grid li, .contact .content .form, .contact .content .contact-text, .video-container").fadeTo(0, 0);

    $(window).scroll(function(a,b) {
      tiles.each(function() {
          a = $(this).offset().top + $(this).height();
          b = $(window).scrollTop() + $(window).height();
          if (a < b) {$(this).fadeTo(1000,1);}
      });
    });

  }

}


  //Menu mobile click
  $( ".icon" ).click(function() {
    $( "ul.menu-click" ).slideToggle( "slow", function() {
    // Animation complete.
    });
  });

$(".mobile-dropdown").click(function() {
    $( "ul.mobile-dropdown-content" ).slideToggle( "slow", function() {
    });
    $( ".move-contact" ).css("margin-top", "90px");
});

$(window).load(function(){


  // Parallax
  if ($('.parallax-background').length) {
    $(".parallax-background").parallax();
  }
  

});

//stikcy menu for mobile
var smScreen = "screen and (max-width: 768px)";
var smView = {
    match: function(){
     $(".menu-media").sticky({topSpacing:0});
     $(".menu-click").sticky({topSpacing:90});
    }
  };

enquire.register(smScreen, smView);

//turn off loader for touch devices
if (Modernizr.touch){
    $('#loader-wrapper').css("display", "none");
  }

  //scrollmagic animation
  //only enable animation on desktop: if (!Modernizr.touch)
  if (!Modernizr.touch){

    //loader
    setTimeout(function(){
      $('body').addClass('loaded');
    }, 1000);

    //$('#loader-wrapper').css("display", "none");
    //controllers
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
    //start page
    var startAni = new TimelineMax();
        startAni.to('.start-page .content', 2, {y:-100, autoAlpha:0, ease: Power1.easeOut},0)
        .to('.blue-circle', 1, {fill:"#fff568"}, 0)
        .to(['#m-rect-left>path', '#m-rect-right>path'], 1, {stroke:"#6dcff6", ease: Power1.easeOut},0);
        

    new ScrollMagic.Scene({
          triggerElement: "#home",
          duration: '80%'
      })
      .setTween(startAni)
      .addTo(onLeaveCtrl);

    //about me page
    var mTriangle = $('.m-triangle')
    var moveUp = new TimelineMax();
        moveUp.staggerFrom(['.about-me-title','.about-me-p'], 4, {y:-70, autoAlpha:0, ease: Power1.easeOut}, 2)
              .staggerFrom(mTriangle, 5, {delay: 3.5, y:-50, autoAlpha:0, ease: Power1.easeOut}, 1)
              .staggerFrom('.m-text', 3, { x:-30, autoAlpha: 0, ease: Power1.easeOut}, .5);


    new ScrollMagic.Scene({
        triggerElement: "#about-us",
        duration: '50%',
        reverse: false
    })
    .setTween(moveUp)
    .addTo(onCenterCtrl);

    var moveUp2 = new TimelineMax();
        moveUp2.staggerFrom(['.portfolio-title','#design'], 4, {y:-50, autoAlpha:0, ease: Power1.easeOut}, 1);

        
    new ScrollMagic.Scene({
        triggerElement: "#portfolio",
        duration: '50%',
    })
    .setTween(moveUp2)
    .addTo(onCenterCtrl);

    //mountain group svg anim
    var mountainGroupAnim = new Vivus('mountain-group',{
                type: 'delayed',
                duration: 100,
                delay: 1,
                animTimingFunction: Vivus.EASE_OUT_BOUCE
    });

 

  }//if (!Modernizr.touch)
  

});

