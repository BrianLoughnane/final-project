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
		introNumber.fadeIn().delay(1200).hide(0);
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
		}, 9000);
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
		}
	}//end introRoll
	
// ================================
// function calls
// ================================
	$('#blackout').fadeOut(1000); 
	playBaliRain();
	introRoll();
	
}); //end on ready