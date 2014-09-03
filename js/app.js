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
			$('body').css('overflow', 'scroll');
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

	$('#resume-link').on("click", function(e) {
		e.preventDefault();
		e.stopPropagation();

		$('#main-content').slideUp().delay(400).slideDown();
		setTimeout(function() {
			$('#main-content').load('resume.html');
		}, 400);
		
	});

	$('#home-link').on("click", function(e) {
		e.preventDefault();
		e.stopPropagation();

		$('#main-content').slideUp().delay(400).slideDown();
		setTimeout(function() {
			$('#main-content').load('about.html');
		}, 400);
		
	});

// ================================
// Resume App Event Handlers
// ================================	

	$('#main-content').on("click", "#navPurpose", function() {
		$("body")
		.animate(
			{scrollTop: 0}, 
			1500
		);
	});	

	$('#main-content').on("click", "#navExperience", function() {
		$("body")
		.animate(
			{scrollTop: 318}, 
			1500
		);
	});	

	$('#main-content').on("click", "#navEducation", function() {
		$("body")
		.animate(
			{scrollTop: 1449}, 
			1500
		);
	});	


	$('#main-content').on("click", "#navLanguages", function() {
		$("body")
		.animate(
			{scrollTop: 1829}, 
			1500
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