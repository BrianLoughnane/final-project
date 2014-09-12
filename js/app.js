$(document).ready(function(){

	$(document).on('scroll', '.content', function() {
		console.log('scroll');
	});


// ================================
// Sizing
// ================================

	function sizing() {
		var viewportWidth = $(window).width();
		var viewportHeight = $(window).height();
		var headerHeight = $('header').outerHeight();
		var resumeNavHeight = $('.resume nav').outerHeight();
		var footerHeight;

		if ($('footer').css('display') === 'none') {
			footerHeight = 0;
		} else {
			footerHeight = $('footer').outerHeight();
		}

		// testing
		footerHeight = 0;
		// end test

		var contentHeight = viewportHeight - headerHeight - footerHeight;
		var resumeContentHeight = contentHeight - resumeNavHeight;

		$('#content-container').css('height', contentHeight);
		$('.content').css('height', contentHeight);
		$('.resume .content').css('height', resumeContentHeight);
		$('.resume section').css('min-height', resumeContentHeight);
	} //end sizing function

	$(window).resize(function() {
		sizing();
		sectionPositioning();
	});	

// ================================
// Intro
// ================================

	var introFadeCounter = 1;
	var introExplodeCounter = 1;

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
			$('#main-content').slideDown(function() {sizing();});
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
// Main Nav
// ================================

	function linkStyleClear() {
		$('nav a').removeClass('current-nav-link').removeClass('current-nav-link-alt').removeClass('margin-fix');
		$('.contact-link').removeClass('contact-link-selected');
	}

	$('.home-link').on("click", function(e) {
		e.preventDefault();
		e.stopPropagation();

		$('#main-content')
		.slideUp(function() {
			$('#main-content')
			.load('about.html', 
				{
					done: function() {
						$('#main-content').delay(400).slideDown(function() {sizing();});
					}
				}
			);
		});

		linkStyleClear();
	});

	$('.resume-link').on("click", function(e) {
		e.preventDefault();
		e.stopPropagation();

		$('#main-content')
		.slideUp(function() {
			$('#main-content')
			.load('resume.html', 
				{
					done: function() {
						$('#main-content')
						.delay(400)
						.slideDown(function() {
							sizing();
							resumeSetup();
						});
					}
				}
			);
		});

		linkStyleClear();
		$('#main-resume-link').addClass('margin-fix');
		$('#main-resume-link').addClass('current-nav-link');
	});

	$('.projects-link').on("click", function(e) {
		e.preventDefault();
		e.stopPropagation();
		
		$('#main-content')
		.slideUp(function() {
			$('#main-content')
			.load('projects.html', 
				{
					done: function() {
						$('#main-content')
						.delay(400)
						.slideDown(function() {
							sizing();
							projectsSetup();
						});
						// .delay(3000)
						// .slideDown(function() {
						// 	projectsSetup();
						// });
					}
				}
			);	
		});

		linkStyleClear();
		$("#main-projects-link").addClass('margin-fix');
		$("#main-resume-link").addClass('margin-fix');
		$("#main-projects-link").addClass('current-nav-link');
	});


	$('.contact-link').on("click", function(e) {
		e.preventDefault();
		e.stopPropagation();

		// $('#main-content')
		// .slideUp(function() {
		// 	$('#main-content')
		// 	.load('contact.html', 
		// 		{
		// 			done: function() {
		// 				$('#main-content').delay(400).slideDown();
		// 			}
		// 		}
		// 	);	
		// });

		// linkStyleClear();
		// $(this).addClass('contact-link-selected');

		$('#contact-popup')
		.css('z-index', 100)
		.animate({'opacity': 1}, 400);

	});

	$('.contact-close').on("click", function(e) {
		e.preventDefault();
		e.stopPropagation();

		$('#contact-popup')
		.animate({'z-index': -1, 'opacity': 0}, 400);

	});


// ================================
// Pages
// ================================	

	function scrollTo(location) {
		$(".content").animate({scrollTop: location}, 1000);
	}

	function sectionPositioning() {
		if($('#purpose').position() !== undefined) {
			$('.content').scrollTop(0);
			resumeSectionPositioning();
		} else if ($('#featured').position() !== undefined) {
			$('.content').scrollTop(0);
			projectSectionPositioning();
		}
	}

// ================================
// Resume
// ================================	

	function resumeSectionPositioning() {
		purposeLocation = $('#purpose').position().top;
		experienceLocation = $('#experience').position().top;
		educationLocation = $('#education').position().top;
		languagesLocation = $('#languages').position().top;
		console.log('resumeSectionPositioning');
	}

	function resumeSetup() {
		resumeSectionPositioning();

		highlightPurpose();

		$('.content').on('scroll', function() {
			if($('.content').scrollTop() >= purposeLocation -50 && $('.content').scrollTop() < experienceLocation -50) {
				highlightPurpose();				
			} else if($('.content').scrollTop() >= experienceLocation -50 && $('.content').scrollTop() < educationLocation -50) {
				highlightExperience();
			} else if($('.content').scrollTop() >= educationLocation -50 && $('.content').scrollTop() < languagesLocation -50) {
				highlightEducation();
			} else if($('.content').scrollTop() >= languagesLocation -50) {
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
		scrollTo(purposeLocation);
	});	

	$('#main-content').on("click", "#navExperience", function() {
		scrollTo(experienceLocation);
	});	

	$('#main-content').on("click", "#navEducation", function() {
		scrollTo(educationLocation);
	});	


	$('#main-content').on("click", "#navLanguages", function() {
		scrollTo(languagesLocation);
	});	

// ================================
// Projects 
// ================================	

	function projectSectionPositioning() {
		featuredLocation = $('#featured').position().top;
		personalLocation = $('#personal').position().top;
		thinkfulLocation = $('#thinkful').position().top ;
		freelanceLocation = $('#freelance').position().top ;
	}

	function projectsSetup() {
		projectSectionPositioning();

		highlightFeatured();

		$('.content').on('scroll', function() {
				if($('.content').scrollTop() >= featuredLocation -50 && $('.content').scrollTop() < personalLocation -50) {
					highlightFeatured();
				} else if($('.content').scrollTop() >= personalLocation -50 && $('.content').scrollTop() < thinkfulLocation -50) {
					highlightPersonal();
				} else if($('.content').scrollTop() >= thinkfulLocation -50 && $('.content').scrollTop() < freelanceLocation -50) {
					highlightThinkful();
				} else if($('.content').scrollTop() >= freelanceLocation -50) {
					highlightFreelance();
				}
		});
		
	}	

	function highlightFeatured() {
		$('.projects nav a').removeClass('current-nav-link-p');
		$('#navFeatured').addClass('current-nav-link-p');
	}

	function highlightPersonal() {
		$('.projects nav a').removeClass('current-nav-link-p');
		$('#navPersonal').addClass('current-nav-link-p');
	}

	function highlightThinkful() {
		$('.projects nav a').removeClass('current-nav-link-p');
		$('#navThinkful').addClass('current-nav-link-p');
	}

	function highlightFreelance() {
		$('.projects nav a').removeClass('current-nav-link-p');
		$('#navFreelance').addClass('current-nav-link-p');
	}

	$('#main-content').on("click", "#navFeatured", function() {
		scrollTo(featuredLocation);
	});	

	$('#main-content').on("click", "#navPersonal", function() {
		scrollTo(personalLocation);
	});	

	$('#main-content').on("click", "#navThinkful", function() {
		scrollTo(thinkfulLocation);
	});	


	$('#main-content').on("click", "#navFreelance", function() {
		scrollTo(freelanceLocation);
	});	

// ================================
// Contact
// ================================	

	// $('#main-content').on("click", "#submit", function() {

	// 	var message = $('#message').val();

	// 	var data = {
	// 		api_user: 'brianloughnane',
	// 		api_key: 'sgpw1232',
	// 		subject: "You've been contacted through your website",
	// 		text: message,
	// 		to: 'mrmusic87@gmail.com',
	// 		from: 'brian@brianloughnane.com',
	// 	};

	// 	var sendgrid = require("sendgrid")('brianloughnane', 'sgpw1232');

	// 	try {
	// 	    sendgrid.send(data, function(err, json) {
	// 	        if (err) return console.error(err);
	// 	        console.log(json);
	// 	    });
	// 	} catch(e) {
	// 	    console.log(e);
	// 	}
		



	// 	$('#main-content')
	// 	.slideUp(function() {
	// 		$('#main-content')
	// 		.load('thank-you.html', 
	// 			{
	// 				done: function() {
	// 					$('#main-content').delay(400).slideDown();
	// 				}
	// 			}
	// 		);				
	// 	});

	// });	




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