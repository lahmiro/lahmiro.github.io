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
	tl.to("#camera, #timelineContainer", 1, {opacity:0});
	
	var bgGrad = new ScrollScene({triggerElement: ".endImg", triggerHook:"onEnter", duration: 300})
				.setTween(tl);

	var imgSlider = new ScrollScene({triggerElement: ".endImg", offset: 300, duration: 300})
				.setTween(TweenMax.to("#imgBox", 1, {x:-200}));

	var picFadeOut = new ScrollScene({offset: 1250, duration: 300})
					.setTween(TweenMax.to("#imgBox", 1, {opacity:0}));

	var circleTween = new ScrollScene({triggerElement: ".img2012", triggerHook: "onEnter", duration: 1000})
				.setTween(TweenMax.from("#2013", 1, {y:-179, fill: "#000"}));


	controller.addScene([
		pinCamera,
		bgGrad,
		imgSlider,
		picFadeOut,
		circleTween,
	
	]);

	// init controller
	var controller2 = new ScrollMagic({
		container: "#imgBox",
	});

	//offset: picSize * (picNo.-1) + (picNo.-1) *  duration  348, 696
	var imgSize = 244;
	var durationHeight = 0;
	var img = $(".img");
	var offsetHeight = [];
	var imgSlider = [];

	//pin other img
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

	circleTween.addIndicators();
	//bgLeftToRight.addIndicators();
});	