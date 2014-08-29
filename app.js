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
		setTimeout(
			function() {
				blink();
			}, 3000
		);
	} // end introFade Function

	function introRoll() {
		introFade(introRollCounter);

		if (introRollCounter === $('section span').length) {
			introRollCounter++;
			introRoll();
			setTimeout(function() {
				// $('section span:last-child').animate({'font-size': '380em', 'top': '-4450px', 'left': '-9390px'}, 1200);
				// $('section span:last-child').css('transition-duration', '3s').css('transform', 'scale(500)');
				$('section span:last-child').addClass('blowUp');
				playExplosion().finish();			
			}, 2000);
		} else if (introRollCounter < $('section span').length) {	
			setTimeout(function() {
				introRollCounter++;
				introRoll();
			}, 4000);
		}//end if

	
	}//end introRoll
	
// ================================
// function calls
// ================================
	$('#blackout').fadeOut(1000, introRoll);
	// introRoll();
	
}); //end on ready