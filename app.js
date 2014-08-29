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
		$('#explosionSound')[0].volume = 0.9;
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
		$("#blackout").fadeIn(1000);
		setTimeout(function() {
			$("#blackout").fadeOut(1000);
		}, 1000);
	}

	function introFade(num) {
		var introNumber = $('#introFades span:nth-child('+num+')');
		introNumber.fadeIn(2000);	
		setTimeout(function() {
			introNumber.fadeOut(2000);
		}, 2000);
		introFadeCounter++;
	} 

	function introExplode(num) {
		var introNumber = $('#introExplode span:nth-child('+num+')');
		introNumber.fadeIn();
		setTimeout(function() {
			introNumber.addClass('blowUp');
			playExplosion();
		}, 1000);
		setTimeout(function() {
			introNumber.hide();
		}, 1200);
		introExplodeCounter++;
	}

	function introExplodeLast(num) {
		var introNumber = $('#introExplode span:nth-child('+num+')');
		introNumber.fadeIn();
		setTimeout(function() {
			introNumber.addClass('blowUp');
			playLightning();
			$('#baliRain').animate({'volume': 0}, 1000);
			setTimeout(function(){
				$('#baliRain').animate({'volume': 0.1}, 2000);
			}, 7000);
			setTimeout(function(){
				$('#baliRain').animate({'volume': 0}, 2000);
			}, 20000);
		}, 2000);
		setTimeout(function() {
			introNumber.hide();
		}, 2200);
		introExplodeCounter++;
	}

	function introRoll() {
		if (introFadeCounter < $('#introFades span').length) {
			introFade(introFadeCounter);	
			setTimeout(function() {
				introRoll();
			}, 4000);
			setTimeout(function() {
				blink();
			}, 3000);
		} else if (introFadeCounter === $('#introFades span').length) {
			introFade(introFadeCounter);
			setTimeout(function() {
				$('#introFades span:last-child').addClass('blowUp');
				playExplosion();
				$('#baliRain')[0].animate({'volume': 0.1}, 1000);
				// blink();		
			}, 2000);
			setTimeout(function() {
				introRoll();		
			}, 4000);
			setTimeout(function() {
				blink();		
			}, 1800);
		} else if (introExplodeCounter < $('#introExplode span').length) {
			introExplode(introExplodeCounter);	
			setTimeout(function() {
				introRoll();
			}, 1200);
		} else if (introExplodeCounter === $('#introExplode span').length) {
			introExplodeLast(introExplodeCounter);
			setTimeout(function() {
				$('#welcome span').fadeIn(5000).delay(1000).fadeOut(5000);
			}, 2300);
			setTimeout(function() {

			});
		}
	}//end introRoll
	
// ================================
// function calls
// ================================
	$('#blackout').fadeOut(1000); 
	playBaliRain();
	introRoll();
	
}); //end on ready