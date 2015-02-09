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
		// init controller
		var controller = new ScrollMagic();

		//pin the camera and the timeline
		var cameraPin = new ScrollScene({
			triggerElement: "#camera-container",
			duration: 2000,
		})
		.setPin('#camera');

		var timelinePin = new ScrollScene({
			triggerElement: "#timeline-container",
			duration: 2000,
		})
		.setPin('#timeline');

		//drawing timeline dots
		function pathPrepare ($el) {
					var lineLength = $el[0].getTotalLength();
					$el.css("stroke-dasharray", lineLength);
					$el.css("stroke-dashoffset", lineLength);
		}

		var $circle = $('#2012 path'); //find the path
		pathPrepare($circle);

		var dotTween = new TimelineMax()
			.add(TweenMax.to($circle, 1, {strokeDashoffset: 0, ease:Linear.easeNone})) 

		var circleScene = new ScrollScene({offset: 500, duration: 200, tweenChanges: true})
			.setTween(dotTween)
			.addTo(controller);

		//image Slider

		
		//add scenes to the controller
		controller.addScene([
			cameraPin,
			timelinePin,
			circleScene,
			
		]);
		//imgPin.addIndicators();
		timelinePin.addIndicators();


});