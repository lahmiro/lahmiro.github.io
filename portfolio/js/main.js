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
	//pin home
	var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });

	
	//home page animation when pinnning
	
	var homeAni = new TimelineMax()
		homeAni.to(home, 7, {y:530}, 0)
				.to(rects01, 4, {y:-80, opacity: 0}, 0)			
				.to(snowMountain, 6, {opacity:0}, 0)
				.to(blueCircle, 4, {fill:"#fff568"}, 0)
				.to(homeTitle, 2, {opacity:0, ease: Power0.easeNone},0)
				.to(homeName, 2, {opacity:0, ease: Power0.easeNone},0)
				.to(introTitle, 2, {rotationX:90}, "-=3")
				.from(introText, 4, {opacity: 0, y: -30, ease: Power4.easeNone}, "-=2")
				.from(rects03, 2, {opacity:0, y:-20, ease: Power4.easeNone}, "-=1")
				.to(home, 1, {display: "none"});
				
	new ScrollMagic.Scene({
	  		triggerElement: "#home",
	  		duration: '100%'
		})
		.setTween(homeAni)
		.setPin("#home")
		.addTo(ctrl)
		.addIndicators(); 

	/*
	ctrl.addScene([
		
	]);

	new ScrollMagic.Scene({
		offset: vh,
		triggerElement: about,
		duration: "200%"
	})
		.setPin(tiltMountain)
		.addTo(ctrl)
		.addIndicators();
	*/
	//onCenter controller
	var ctrl2 = new ScrollMagic.Controller({
		globalSceneOptions: {
            triggerHook: 'onEnter'
        }
	});




});


