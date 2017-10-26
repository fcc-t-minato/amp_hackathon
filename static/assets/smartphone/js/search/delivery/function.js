/* ===================================================================
javascript information

File Name  : function.js
Author     :
Style Info :
=================================================================== */

$(function(){

	$(document).ready(function(){

		$(':hidden[name="onclickFlag"]').val("off");

		if(window.innerWidth>800 ){
			$('#refineNavWrap .col01').closest('.dpMenu').addClass('active');
		}
	});
	//****************************************************
	// 絞り込みの展開
	//****************************************************

	$(document).on('click','#refineNavWrap .dpMenu > a',function(){
		if(!$(this).closest('.dpMenu').hasClass('active')){
			$(this).closest('.dpMenu').addClass('active');
			$(this).closest('.dpMenu').siblings().removeClass('active');
		}else{
			if(window.innerWidth<800 ){
				$(this).closest('.dpMenu').removeClass('active');
			}else{
				if(!$(this).closest('.dpMenu').hasClass('col01')){
					$(this).closest('.dpMenu').removeClass('active');
					$(this).closest('.dpMenu').parent().find('.col01').addClass('active');
				}
			}
		}
	});

	$(document).on('click',function(e) {
		if(window.innerWidth<800 ){
			if(!$.contains($('#refineNavWrap')[0],e.target)){
				$('#refineNavWrap .dpMenu').removeClass('active');
				$(this).closest('.dpMenu').parent().find('.col01').removeClass('active');
			}
		}
	});

	$(document).on('click','#refineNavWrap .dpMenu .closeBtn',function(){
		if(window.innerWidth<800){
			$(this).closest('.dpMenu').removeClass('active');
		}else{
			$(this).closest('.dpMenu').removeClass('active');
			$(this).closest('.dpMenu').parent().find('.col01').addClass('active');
		}
	});
//****************************************************
// 絞り込みのniceScroll設定
//****************************************************

$('#refineNavWrap .dpMenu .dpMenuInner nav ul').each(function(){
	$(this).niceScroll({
		cursorcolor:'#bbb',
		cursorborderradius:'15px',
		cursorborder:'none',
		cursorwidth:'15px',
		cursoropacitymin:'0.8',
		cursoropacitymax:'0.8',
		nativeparentscrolling:false
	});
});


$(document).on('oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend','#refineNavWrap .dpMenu .dpMenuInner',function(){
	$('#refineNavWrap .dpMenu .dpMenuInner nav ul').each(function(){
		$(this).getNiceScroll().resize();
	});
});

$(window).on('load resize PgwBrowser::StopResizing',function(){
	$('#refineNavWrap .dpMenu .dpMenuInner nav ul').each(function(){
		$(this).getNiceScroll().resize();
	});
});

}); // [END]