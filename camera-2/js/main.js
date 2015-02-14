var svg = new Walkway({
  selector: '#camera',
  duration: '3000',
  // can pass in a function or a string like 'easeOutQuint'
  easing: function (t) {
    return  t<.5 ? 2*t*t : -1+(4-2*t)*t;
  }
});

svg.draw();

$(document).ready(function($) {

	var controller = new ScrollMagic();
	//pin camera and timeline
	var pinCamera = new ScrollScene({offset: 0, duration: 900})
					.setPin("#centerContainer");
	//section1 bg fades to black, camera fades out at the same time
	var tl = new TimelineLite();
	tl.to("#section1",2,{backgroundColor: "#000"});
	//tl.to("#camera, #timelineContainer", 1, {opacity:0});
	
	var bgGrad = new ScrollScene({triggerElement: ".endImg", triggerHook:"onEnter", duration: 300})
				.setTween(tl);

	//imgSlider fade out 
	var picFadeOut = new ScrollScene({offset: 1250, duration: 300})
					.setTween(TweenMax.to("#imgBox", 1, {opacity:0}));
    
    //moving dot 
	var movingDot = new ScrollScene({triggerElement: ".img2012", duration: 3172})
				.setTween(TweenMax.to("#dotMoving", 5, {y:596, ease:Sine.easeOut}));

	//passing dot anim
	/*
	var dots = $(".dotPassing");
	var tlDots = [];
	for(var i=1, l =dots.length; i <=l; i++){
		var dotPassing = $(".dotPassing:nth-child(i)"); //not working
		tlDots[i] = new TimelineMax();
		tlDots[i].to("dotPassing",0.3, {fill:"white", scale: 3, transformOrigin: "50% 50%", opacity: 0.2});
		tlDots[i].to("dotPassing",0.2, {scale: 1, opacity:1});
	} */

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


	//flipping cube
	

	controller.addScene([
		pinCamera,
		bgGrad,
		picFadeOut,
		movingDot,
		passingDot2013,
		passingDot2014,
	]);

	// init controller for imgSlider
	var controller2 = new ScrollMagic({
		container: "#imgBox",
	});

	//offset: picSize * (picNo.-1) + (picNo.-1) *  duration  348, 696
	var imgSize = 244;
	var durationHeight = 0;
	var img = $(".img");
	var offsetHeight = [];
	var imgSlider = [];

	//pin other img when slidping to top of the imgBox
	for(var i=1, l = img.length; i <=l; i++){
		offsetHeight[i] = imgSize * i + durationHeight * i;
		imgSlider[i] = new ScrollScene({offset: offsetHeight[i], duration: durationHeight})
					.setTween(TweenLite.to(img, 2, {ease: Power1.easeOut}))
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
});	