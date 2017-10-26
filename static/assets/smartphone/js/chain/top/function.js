/* ===================================================================
javascript information

File Name  : function.js
Author     : 
Style Info : 
=================================================================== */

$(function(){

//****************************************************
// アコーディオンボタン開閉
//****************************************************

$('#topSearchCont li').first().addClass('active').find('.acdCont').show();

$(document).on('click','#topSearchCont li h3',function(){	
	$(this).next('.acdCont').slideDown(300).closest('li').addClass('active');
	$(this).closest('li').siblings().removeClass('active').find('.acdCont').slideUp(300);
});

}); // [END]