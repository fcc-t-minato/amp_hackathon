/* ===================================================================
javascript information

File Name  : function.js
Author     : 
Style Info : 
=================================================================== */

$(function(){

//****************************************************
// 絞り込みがカテゴリしか無い場合想定
//****************************************************

if($('#contTab > li').size() == 1){
	$('#contTab').addClass('column-1');
}

//****************************************************
// hashchange設定（ユーザーコメントにも固有のURL）
//****************************************************

$(document).on('click','.hashChange',function(e){	
	var urlHash = $(this).attr('href');
	var urlHashTarget = $(urlHash == '#' || urlHash == '' ? 'html' : urlHash);
	var urlHashPosition = urlHashTarget.offset().top;
	if (window.matchMedia( "(min-width: 800px)" ).matches) {
		urlHashPosition = urlHashPosition - $('#gHeader').height() - $('#gFooter').height();
	}
	$('html,body').animate({scrollTop:urlHashPosition},500,'swing');
});

$(window).hashchange(function(){
	var wHash = window.location.hash;
	
	if($(wHash).size()){
		$(wHash).click();

		var targetPosition = $(wHash).offset().top;
		$('html,body').animate({scrollTop:targetPosition},500,'swing');
	}
});
$(window).hashchange();	

}); // [END]