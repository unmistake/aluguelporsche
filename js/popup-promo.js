// This will run when the global deferred object is resolved by the AE.init function
$.when(dfd_ready).then(function() {
	window.addEventListener('load', checkAEcookie);
	
	AE.components.popupPromo = (function() {
		var APP = {
			init:function() {
				var cookieName = $('.popup-promo').data('popup-promo-title').toString().replace(/\s/g, '');
				var promoNoMobile = AE.getSiteViewType() === 'palm' && AEdata.promoNoMobile;
				if ( AECookie.read(cookieName) || promoNoMobile) { return; }
				
				AECookie.new({name: cookieName, value: 'true', daysToLive: 0, minutesToLive: 10});
				
				$('body').append( $('#popup-promo') );
				var $promo = $('#popup-promo'),
					delayTime = $('.popup-promo').data('popup-promo-delay') || 0;
				
				// Convert seconds of delay to miliseconds.
				delayTime = parseInt( delayTime * 1000);
				
				$promo.delay( delayTime ).slideToggle("slow");
				
				$(document).on('click','.popup-promo__close', function() {
					//console.log('Clicked the x.');
					$promo.slideToggle("slow", function(){
						$(this).remove();
					});
				});
			},
		}
		return APP;
	})();
	
	function checkAEcookie() {
		if ( 'AECookie' in window ) {
			AE.components.popupPromo.init();
			window.removeEventListener('load', checkAEcookie);
			return;
		}
		
		return checkAEcookie();
	}
});
