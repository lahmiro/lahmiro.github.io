

$(document).ready(function($) {

	var svg = new Walkway({
  selector: '#camera',
  duration: '2500',
  // can pass in a function or a string like 'easeOutQuint'
  easing: function (t) {
    return  t<.5 ? 2*t*t : -1+(4-2*t)*t;
  }
});

var svg2 = new Walkway({
  selector: '#timeline',
  duration: '1000',
  easing: function (t) {
    return  t<.5 ? 2*t*t : -1+(4-2*t)*t;
  }
});

svg.draw();
svg2.draw();

function popup(url) {
	newwindow=window.open(url,'name','height=500,width=600');
	if (window.focus) {newwindow.focus()}
	return false;
}

//set up iScroll 
var myScroll;

function loaded () {
	myScroll = new IScroll('#imgBox', { mouseWheel: true });
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);


	//init scrollMagic controller
	var controller = new ScrollMagic();

    //moving dot 
	var movingDot = new ScrollScene({triggerElement: ".img2012", duration: 3170})
				.setTween(TweenMax.to("#dotMoving", 5, {y:596, ease:Sine.easeOut}));

	//dots anim
	//simply the code below
	var tl3 = new TimelineMax();
	tl3.to("#dot2013", 0.3, {fill:"white", scale: 3, transformOrigin: "50% 50%", opacity: 0.2});
	tl3.to("#dot2013", 0.2, {scale: 1, opacity:1}); 

	var tl4 = new TimelineMax();
	tl4.to("#dot2014", 0.3, {fill:"white", scale: 3, transformOrigin: "50% 50%", opacity: 0.2});
	tl4.to("#dot2014", 0.2, {scale: 1, opacity:1}); 


	var passingDot2013 = new ScrollScene({triggerElement:".img2012", offset: 660, duration: 40})
					.setTween(tl3);

	var passingDot2014 = new ScrollScene({triggerElement:".img2012", offset: 1440, duration: 40})
					.setTween(tl4);

	//testing: need to be fixed later
	var flip01 = new ScrollScene({triggerElement:"#imgContainer", offset: 200, duration: 50})
			.setTween(TweenMax.to("#cube", 1, {rotationX:90, ease: Power1.easeOut}));

	
	controller.addScene([
		movingDot,
		passingDot2013,
		passingDot2014,
		flip01,
	]);

	// init controller for imgSlider
	var controller2 = new ScrollMagic({
		container: "#imgBox",
	});

	//offset: picSize * (picNo.-1) + (picNo.-1) *  duration  348, 696
	var imgHeight = 244;
	var durationHeight = 0;
	var img = $(".img");
	var offsetHeight = [];
	var imgSlider = [];

	//pin other img when slidping to top of the imgBox
	for(var i=1, l = img.length; i <=l; i++){
		offsetHeight[i] = imgHeight * i + durationHeight * i;
		imgSlider[i] = new ScrollScene({offset: offsetHeight[i], duration: durationHeight})
					.setTween(TweenLite.to(img, 1, {ease: Power1.easeOut}))
					.setPin(img[i-1]);
	}

	//pin img1
	var pinImg1 = new ScrollScene({triggerHook: "onLeave", duration: durationHeight})
				.setPin(".img1");

	controller2.addScene([
		pinImg1,
		imgSlider,
	]);

	//circleTween.addIndicators();
	//bgLeftToRight.addIndicators();

	//opening aminations
	//arrows anim at the start
	var btn = $(".clickItems");
	var btnTl = [];
	for(var i=0, l=btn.length; i<l; i++){
		btnTl[i] = new TimelineMax();
		btnTl[i].to(btn[i],0.2,{y:2, strokeWidth:"1.5", ease: Power0.easeNone, delay:2.5});
		btnTl[i].to(btn[i], 0.1,{y:0, strokeWidth: "1", ease: Power0.easeNone});
		btnTl[i].to(btn[i],0.2,{y:2, strokeWidth:"1.5", ease: Power0.easeNone});
		btnTl[i].to(btn[i],0.1,{y:0, strokeWidth:"1", ease: Power0.easeNone});
		btnTl[i].to(btn[i],0.1,{strokeWidth:"1", ease: Power0.easeNone});
	}
	//gear rotation
	var gearRotate = TweenMax.to("#AEAFBtn", 3, {rotation: "60", ease:Power1.easeOut, transformOrigin: "50% 50%", delay:2.5});

	//left btns rotation
	var leftBtnRotate = TweenMax.staggerTo(".rotateBtn", 3, {rotation: "360",  ease: Bounce.easeOut, transformOrigin: "50% 50%", delay:2.5}, 0.3);

	//lvBtn rotate
	var LvBtnRotate = TweenMax.to("#LvBtn", 1, {rotation: "60", ease: Bounce.easeOut, transformOrigin:"40% 48%", delay: 2.5});

	//arrowsBtn rotate
	var arrowsBtnRotate = new TimelineMax();
	arrowsBtnRotate.from("#arrowsBtn", 1, {rotation: "-90", ease: Bounce.easeOut, transformOrigin:"50% 43%", delay: 2.5});
	arrowsBtnRotate.to("#arrowsBtn", 2, {rotation: "0", ease: Bounce.easeOut, transformOrigin:"50% 43%"});

	//click arrows anim
	$(".clickItems").click(clickHandler);
	function clickHandler(){
		var newTl = new TimelineMax();
			newTl.to($(this), 0.1, {y:2, strokeWidth: "1.5", ease: Power0.easeNone});
			newTl.to($(this), 0.05, {y:0, strokeWidth:"1", ease: Power0.easeNone});
	};

	//arrow key anim when hover
	var rotateStill = new TweenMax.to("#arrowsBtn", 1, {rotation: "+=0", ease: Bounce.easeOut, transformOrigin:"50% 43%"});
	$(".clickItems").hover(
		function(){
			if(($(this).is("#downArrow")) || ($(this).is("#centerArrow"))){
				TweenMax.to("#arrowsBtn", 1, {rotation: "0", ease: Bounce.easeOut, transformOrigin:"50% 43%"});
			}
			if($(this).is("#upArrow")){
				TweenMax.to("#arrowsBtn", 1, {rotation: "-180", ease: Bounce.easeOut, transformOrigin:"50% 43%"});
			}
			if($(this).is("#leftArrow")){
				TweenMax.to("#arrowsBtn", 0.5, {rotation: "90", ease: Bounce.easeOut, transformOrigin:"50% 43%"});
			}
			if($(this).is("#rightArrow")){
				TweenMax.to("#arrowsBtn", 0.5, {rotation: "-90", ease: Bounce.easeOut, transformOrigin:"50% 43%"});
			}
		},function(){
				rotateStill;
		}
	);

	
	//rotate FB and Twitter Btn when hover
	$(".rotateBtn").hover(
		function(){
			TweenMax.to($(this), 1, {fill: "white", rotation: "360", ease: Bounce.easeOut, transformOrigin: "50% 50%"});
			
		},function(){
			TweenMax.to($(this), 1, {fill: "#3498db",rotation: "0", ease: Bounce.easeOut, transformOrigin: "50% 50%"});
		}
	);

	
	//rotating gear anim
	$("#AEAFBtn").hover(
		function(){
			TweenMax.to($(this), 6, {rotation: "+=100", ease:Linear.easeNone, transformOrigin: "50% 50%"});
		},function(){
			TweenMax.to($(this), 2.5, {rotation: "+=20", ease: Power1.easeOut, transformOrigin: "50% 50%"});
		}
	);

	//rotate LvBtn
	$("#LvBtn").mouseover(
		function(){
			TweenMax.to("#LvBtn", 0.5, {rotation: "+=60", ease: Bounce.easeOut, transformOrigin:"40% 48%"});
		}
	); 



});	