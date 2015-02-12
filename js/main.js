
$(document).ready(function($) {
		// init controller
		var controller = new ScrollMagic({
			container: "#box",
		});

		//offset: picSize * (picNo.-1) + (picNo.-1) *  duration  348, 696
		var imgSize = 248;
		var durationHeight = 100;
		var img = $(".img");
		var offsetHeight = [];
		var scene = [];

		//pin other img
		for(var i=1, l = img.length; i <=l; i++){
			offsetHeight[i] = imgSize * i + durationHeight * i;
			console.log(offsetHeight[i]);
			scene[i] = new ScrollScene({offset: offsetHeight[i], duration: durationHeight})
						.setPin(img[i-1]);
		}

		//pin img1
		var pinImg1 = new ScrollScene({triggerHook: "onLeave", duration: durationHeight})
					.setPin(".img1");

		controller.addScene([
			pinImg1, 
			scene,

		]);
		
});	