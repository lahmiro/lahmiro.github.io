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


 //portfolio-thumbs hover 
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

    var tiles = $("h1, h2, h3, .grid li, .contact .content .form, .contact .content .contact-text, .video-container ").fadeTo(0, 0);

    $(window).scroll(function(a,b) {
      tiles.each(function() {
          a = $(this).offset().top + $(this).height();
          b = $(window).scrollTop() + $(window).height();
          if (a < b) {$(this).fadeTo(1000,1);}
      });
    });

  }

}

//stikcy menu for mobile
if(vw < 767){
   $(".menu-media").sticky({topSpacing:0});
   $(".menu-click").sticky({topSpacing:90});
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

$(".preloader").delay(1000).fadeOut("slow");

  // Parallax
  if ($('.parallax-background').length) {
    $(".parallax-background").parallax();
  }
  
  // Parallax
  //if ($('.parallax-background-partners').length) {
  //  $(".parallax-background-partners").parallax();
  //}  

});



});

