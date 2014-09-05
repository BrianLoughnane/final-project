$(document).ready(function(){

// ================================
// global variable declarations
// ================================

	var introFadeCounter = 1;
	var introExplodeCounter = 1;

// ================================
// function declarations
// ================================

	function playExplosion() {
		$('#explosionSound')[0].volume = 1;
		$('#explosionSound')[0].load();
		$('#explosionSound')[0].play();
	}

	function playLightning() {
		$('#lightningSound')[0].volume = 1;
		$('#lightningSound')[0].load();
		$('#lightningSound')[0].play();
	}

	function playBaliRain() {
		$('#baliRain')[0].volume = 0.2;
		$('#baliRain')[0].load();
		$('#baliRain')[0].play();
	}

	function blink() {
		$("#blackout").fadeIn(1000).fadeOut(1000);
	}

	function blowUp(elem) {
		elem.addClass('blowUp');
		playExplosion();
	}

	function introFade(num) {
		var introNumber = $('#introFades span:nth-child('+num+')');
		introNumber.fadeIn(2000).fadeOut(2000);	
		introFadeCounter++;
	} 

	function introExplode(num) {
		var introNumber = $('#introExplode span:nth-child('+num+')');
		introNumber.fadeIn().delay(1050).hide(0);
		introExplodeCounter++;
		setTimeout(function() {
			blowUp(introNumber);
		}, 1000);
	}

	function introExplodeLast(num) {
		var introNumber = $('#introExplode span:nth-child('+num+')');
		introNumber.fadeIn().delay(2200).hide(0);
		introExplodeCounter++;
		setTimeout(function() {
			introNumber.addClass('blowUp');
			playLightning();
		}, 2000);
		// setTimeout(function() {
		// 	$('#welcome span').fadeIn(5000).delay(1000).fadeOut(5000);
		// }, 2300);
		setTimeout(function(){
			$('#welcome span').fadeIn(5000).delay(1000).fadeOut(5000);
			$('#baliRain').animate({'volume': 0.5}, 5000).delay(1000).animate({'volume': 0}, 5000);
		}, 5000);
	}

	function setup() {
		setTimeout(function() {
			$('header').slideDown();
			$('#main-content').load('about.html');
		}, 1000);

		setTimeout(function() {
			$('#main-content').slideDown();
		}, 1500);
		
	}	



	function introRoll() {
		if (introFadeCounter < $('#introFades span').length) {
			introFade(introFadeCounter);	
			setTimeout(function() {
				blink();
			}, 3000);
			setTimeout(function() {
				introRoll();
			}, 4000);
		} else if (introFadeCounter === $('#introFades span').length) {
			introFade(introFadeCounter);
			setTimeout(function() {
				$('#introFades span:last-child').addClass('blowUp');
				$('#baliRain').animate({'volume': 0}, 1000);
				playExplosion();
				blink();
			}, 2000);
			setTimeout(function() {
				introRoll();		
			}, 3000);
		} else if (introExplodeCounter < $('#introExplode span').length) {
			introExplode(introExplodeCounter);	
			setTimeout(function() {
				introRoll();
			}, 1200);
		} else if (introExplodeCounter === $('#introExplode span').length) {
			introExplodeLast(introExplodeCounter);
			setTimeout(function() {
				introRoll();
			}, 16000);
		} else {
			$('.intro').hide();
			setup();
		}
	}//end introRoll
	
// ================================
// Intro
// ================================
	$('#blackout').fadeOut(1000); 
	// playBaliRain();
	// introRoll();
	setup();

// ================================
// Main Nav Event Handlers
// ================================

	function linkStyleClear() {
		$('header nav a').removeClass('current-nav-link').removeClass('current-nav-link-alt').removeClass('margin-fix');
		$('.contact-link').removeClass('contact-link-selected');
	}

	$('#home-link').on("click", function(e) {
		e.preventDefault();
		e.stopPropagation();

		$('#main-content').slideUp().delay(400).slideDown();
		setTimeout(function() {
			$('#main-content').load('about.html');
		}, 400);

		linkStyleClear();
	});

	$('#resume-link').on("click", function(e) {
		e.preventDefault();
		e.stopPropagation();

		$('#main-content').slideUp().delay(400).slideDown();
		
		setTimeout(function() {
			$('#main-content').load('resume.html');
		}, 400);

		setTimeout(function() {
			resumeSetup();
		}, 1000);

		linkStyleClear();
		$(this).addClass('margin-fix');
		$(this).addClass('current-nav-link');
	});

	$('#projects-link').on("click", function(e) {
		e.preventDefault();
		e.stopPropagation();

		$('#main-content').slideUp().delay(400).slideDown();
		setTimeout(function() {
			$('#main-content').load('projects.html');
		}, 400);

		setTimeout(function() {
			projectsSetup();
		}, 1000);

		linkStyleClear();
		$(this).addClass('margin-fix');
		$('#resume-link').addClass('margin-fix');
		$(this).addClass('current-nav-link');
	});

	$('.contact-link').on("click", function(e) {
		e.preventDefault();
		e.stopPropagation();

		$('#main-content').slideUp().delay(400).slideDown();
		setTimeout(function() {
			$('#main-content').load('contact.html');
		}, 400);

		linkStyleClear();
		$(this).addClass('contact-link-selected');
	});


// ================================
// Resume
// ================================	

	function resumeSetup() {
		purposeLocation = $('#purpose').position().top;
		experienceLocation = $('#experience').position().top;
		educationLocation = $('#education').position().top;
		languagesLocation = $('#languages').position().top;

		highlightPurpose();

		$('.content').on('scroll', function() {
			if($('.content').scrollTop() >= purposeLocation && $('.content').scrollTop() < experienceLocation) {
				highlightPurpose();				
			} else if($('.content').scrollTop() >= experienceLocation && $('.content').scrollTop() < educationLocation) {
				highlightExperience();
			} else if($('.content').scrollTop() >= educationLocation && $('.content').scrollTop() < languagesLocation) {
				highlightEducation();
			} else if($('.content').scrollTop() >= languagesLocation) {
				highlightLanguages();
			}
		});
	}

	function highlightPurpose() {
		$('.resume nav a').removeClass('current-nav-link');
		$('#navPurpose').addClass('current-nav-link');
	}

	function highlightExperience() {
		$('.resume nav a').removeClass('current-nav-link');
		$('#navExperience').addClass('current-nav-link');
	}

	function highlightEducation() {
		$('.resume nav a').removeClass('current-nav-link');
		$('#navEducation').addClass('current-nav-link');
	}

	function highlightLanguages() {
		$('.resume nav a').removeClass('current-nav-link');
		$('#navLanguages').addClass('current-nav-link');
	}

	$('#main-content').on("click", "#navPurpose", function() {
		highlightPurpose();

		$(".content")
		.animate(
			{scrollTop: purposeLocation}, 			
			1000
		);
	});	

	$('#main-content').on("click", "#navExperience", function() {
		highlightExperience();

		$(".content")
		.animate(
			{scrollTop: experienceLocation},  
			1000
		);
	});	

	$('#main-content').on("click", "#navEducation", function() {
		highlightEducation();

		$(".content")
		.animate(
			{scrollTop: educationLocation}, 
			1000
		);
	});	


	$('#main-content').on("click", "#navLanguages", function() {
		highlightLanguages();

		$(".content")
		.animate(
			{scrollTop: languagesLocation}, 
			1000
		);
	});	

// ================================
// Projects 
// ================================	

	function projectsSetup() {
		featuredLocation = $('#featured').position().top;
		personalLocation = $('#personal').position().top;
		thinkfulLocation = $('#thinkful').position().top ;
		freelanceLocation = $('#freelance').position().top ;

		highlightFeatured();

		$('.content').on('scroll', function() {
				if($('.content').scrollTop() >= featuredLocation && $('.content').scrollTop() < personalLocation -1) {
					highlightFeatured();
				} else if($('.content').scrollTop() >= personalLocation -1 && $('.content').scrollTop() < thinkfulLocation -1) {
					highlightPersonal();
				} else if($('.content').scrollTop() >= thinkfulLocation -1 && $('.content').scrollTop() < freelanceLocation -1) {
					highlightThinkful();
				} else if($('.content').scrollTop() >= freelanceLocation -1) {
					highlightFreelance();
				}
		});
		
	}	

	function highlightFeatured() {
		$('.projects nav a').removeClass('current-nav-link-p').removeClass('margin-fix-p');
		$('#navFeatured').addClass('current-nav-link-p').addClass('margin-fix-p');
	}

	function highlightPersonal() {
		$('.projects nav a').removeClass('current-nav-link-p').removeClass('margin-fix-p');
		$('#navPersonal').addClass('current-nav-link-p').addClass('margin-fix-p');
	}

	function highlightThinkful() {
		$('.projects nav a').removeClass('current-nav-link-p').removeClass('margin-fix-p');
		$('#navThinkful').addClass('current-nav-link-p').addClass('margin-fix-p');
	}

	function highlightFreelance() {
		$('.projects nav a').removeClass('current-nav-link-p').removeClass('margin-fix-p');
		$('#navFreelance').addClass('current-nav-link-p').addClass('margin-fix-p');
	}

	$('#main-content').on("click", "#navFeatured", function() {
		// highlightFeatured();

		$(".content")
		.animate(
			{scrollTop: featuredLocation}, 
			1000
		);
	});	

	$('#main-content').on("click", "#navPersonal", function() {
		// highlightPersonal();

		$(".content")
		.animate(
			{scrollTop: personalLocation}, 
			1000
		);
	});	

	$('#main-content').on("click", "#navThinkful", function() {
		// highlightThinkful();

		$(".content")
		.animate(
			{scrollTop: thinkfulLocation}, 
			1000
		);
	});	


	$('#main-content').on("click", "#navFreelance", function() {
		// highlightFreelance();

		$(".content")
		.animate(
			{scrollTop: freelanceLocation}, 
			1000
		);
	});	


}); //end on ready



	// function fadeSequence() {
	// 	if (introFadeCounter < $('#introFades span').length) {
	// 		introFade(introFadeCounter);	
	// 		setTimeout(function() {
	// 			blink();
	// 		}, 3000);
	// 		setTimeout(function() {
	// 			introRoll();
	// 		}, 4000);
	// 	} else if (introFadeCounter === $('#introFades span').length) {
	// 		introFade(introFadeCounter);
	// 		setTimeout(function() {
	// 			$('#introFades span:last-child').addClass('blowUp');
	// 			$('#baliRain').animate({'volume': 0}, 1000);
	// 			playExplosion();
	// 			blink();
	// 		}, 2000);
	// 		setTimeout(function() {
	// 			introRoll();		
	// 		}, 3000);
	// 	}

	// 	condition = true;
	// }

	// function explodeSequence() {
	// 	if (introExplodeCounter < $('#introExplode span').length) {
	// 		introExplode(introExplodeCounter);	
	// 		setTimeout(function() {
	// 			introRoll();
	// 		}, 1200);
	// 	} else if (introExplodeCounter === $('#introExplode span').length) {
	// 		introExplodeLast(introExplodeCounter);
	// 	}
	// }

	// function introRoll() {
	// 	var condition = false;
	// 	fadeSequence();
	// 	if(condition) {
	// 		explodeSequence();
	// 	}
	// }