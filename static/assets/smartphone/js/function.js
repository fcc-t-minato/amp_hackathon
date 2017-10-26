/* ===================================================================
javascript information

File Name  : function.js
Author     : 
Style Info : 
=================================================================== */

$(function(){

//****************************************************
// slickを初期化
//****************************************************

$('#topSlider').slick({
	lazyLoad:'ondemand',
	accessibility:true,
	fade:false,
	dots:false,
	infinite:true,
	speed:500,
	autoplay:true,
	autoplaySpeed:3000,
	arrows:false,
	slidesToScroll:1,
	swipe:true,
	touchMove:true,
	centerPadding:'0px',
	adaptiveHeight:false,
	slidesToShow:1,
	pauseOnHover:true
});

//****************************************************
// アコーディオンボタン開閉
//****************************************************

$('#topSearchCont li').first().addClass('active').find('.acdCont').show();

$(document).on('click','#topSearchCont li h3',function(){	
	$(this).next('.acdCont').slideDown(300).closest('li').addClass('active');
	$(this).closest('li').siblings().removeClass('active').find('.acdCont').slideUp(300);
});

}); // [END]