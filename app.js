$(document).ready(function(){

// ================================
// global variable declarations
// ================================

	var introRollCounter = 1;

// ================================
// function declarations
// ================================

	function playExplosion() {
		$('#explosionSound')[0].volume = 0.5;
		$('#explosionSound')[0].load();
		$('#explosionSound')[0].play();
	}

	function blink() {
		$("#blackout").fadeIn(1000);
		setTimeout(function() {
			$("#blackout").fadeOut(1000);
		}, 1000

		);
		

	}

	function introFade(num) {
		var introNumber = $('section span:nth-child('+num+')');
		introNumber.fadeIn(2000);	
		setTimeout(
			function() {
				introNumber.fadeOut(2000);
			}, 2000
		);
	} // end introFade Function

	function introRoll() {

		if (introRollCounter < $('section span').length) {
			introFade(introRollCounter);	
			setTimeout(function() {
				introRollCounter++;
				introRoll();
			}, 4000);
			setTimeout(
				function() {
					blink();
				}, 3000
			);
		} else if (introRollCounter === $('section span').length) {
			introFade(introRollCounter);
			introRollCounter++;
			setTimeout(function() {
				$('section span:last-child').addClass('blowUp');
				playExplosion().finish();			
			}, 2000);
			setTimeout(
				function() {
					blink();
				}, 2000
			);
		} //end if

	
	}//end introRoll
	
// ================================
// function calls
// ================================
	$('#blackout').fadeOut(1000); 
	introRoll();
	
}); //end on ready