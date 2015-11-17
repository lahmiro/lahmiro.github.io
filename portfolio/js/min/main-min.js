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
	var intro = $('.intro-container');
	
	//on Leave controller
	var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });

	//onEnter controller
	var ctrl2 = new ScrollMagic.Controller({
		globalSceneOptions: {
            triggerHook: 'onEnter'
        }
	});

	//onCenter controller
	var ctrl3 = new ScrollMagic.Controller({
		globalSceneOptions: {
            triggerHook: 'onCenter'
        }
	});
	
	//home page anim when pinnning
	var homeAni = new TimelineMax()
		homeAni.to(home, 7, {y:530}, 0)
				.to(rects01, 4, {y:-80, opacity: 0}, 0)			
				.to(snowMountain, 6, {opacity:0}, 0)
				.to(blueCircle, 4, {fill:"#fff568"}, 0)
				.to(homeTitle, 2, {opacity:0, ease: Power0.easeNone},0)
				.to(homeName, 2, {opacity:0, ease: Power0.easeNone},0)
				.to(introTitle, 2, {rotationX:90}, "-=1")
				.from(introText, 4, {opacity: 0, y: -30, ease: Power4.easeNone})
				.from(rects03, 2, {opacity:0, y:-20, ease: Power4.easeNone})
				.to(home, 1, {display: "none"});

	new ScrollMagic.Scene({
	  		triggerElement: "#home",
	  		duration: '100%'
		})
		.setTween(homeAni)
		.setPin("#home")
		.addTo(ctrl)
		.addIndicators(); 

	

	//about page text fades out
	var fadeOut = new TimelineMax()
		fadeOut.to(introText, 3, {opacity:0, y: -30, delay: 2},0)
				.to(introTitle,3,{opacity:0, y:-30, delay: 2},0);
		
	new ScrollMagic.Scene({
		triggerElement: "#skills",
		duration: 200
	})
		//.setClassToggle("#about", "active")
		.setTween(fadeOut)
		.addTo(ctrl2)
		.addIndicators();

	//skills page anim
	var drops = $('.circle-drop-container');
	var dropSvg = $('.drop');
	var water = $('.water');
	var bottleText = $('.fu-text');
	var skillsTitle = $('.skills-title');
	var rects04 = $('#rects-04');
	//chagne drop shape
	var changedDropPath = "M201.543,205.535c0,55.229-44.771,100-100,100s-100-44.771-100-100s100-199.229,100-199.229 S201.543,150.306,201.543,205.535z";
	//TweenMax.to(changedDropShape, 3, {attr: {d: changedDropShape}});

	//drop anim
	var dropAnim = new TimelineMax()
		dropAnim.set(drops, {width: 100, height:100, left: "50%", xPercent: "-50%", y: -0.72*vh})
				.to(drops, 1, {y: 0, width: 30, height:30, left: "70%", xPercent: "-50%", ease: Power1.easeIn}, 0)
				.to(dropSvg, 0.5, {fill:"#6dcff6"}, 0.5)
				.from(skillsTitle, 1, {y:-50, opacity:0, ease: Power1.easeNone}, 0)
				.to(dropSvg, 0.5, {attr: {d: changedDropPath}}, 0.5)
				.to(dropSvg, 1, {opacity:0})
				.to(water, 0.8, {top: "5%", ease: Power1.easeIn}, 0.3)
				.from(bottleText, 0.5, {opacity: 0, y: -10, ease: Elastic.easeOut.config(1, 0.3)}, 1);
				
		

	new ScrollMagic.Scene({
	  		triggerElement: "#skills",
	  		duration: '50%'
		})
		.setTween(dropAnim)
		.addTo(ctrl3)
		.addIndicators(); 

	//new ScrollMagic.

	/*
	
	var pinani = new TimelineMax()
    .add(TweenMax.to(about, 1, {y:0}))
    .add(TweenMax.to(skills, 1, {y:0}));

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
	




});




