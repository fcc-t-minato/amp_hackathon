/* ===================================================================
javascript information

File Name  : function.js
Author     :
Style Info :
=================================================================== */

$(function(){

//****************************************************
// お気に入りアイコン
//****************************************************

/*
$(document).on('click','.favoriteIcon a',function(){
  var closest = $(this).closest('.favoriteIcon');
	if(!closest.hasClass('active')){
		setFavorite(closest, true, function(){ closest.addClass('active'); });
	}else{
    setFavorite(closest, false, function(){ closest.removeClass('active'); });
	}
});
*/

//****************************************************
// 最低注文金額が無い場合想定
//****************************************************

if($('#topCont02 > p').size() == 1){
	$('#topCont02').addClass('column-1');
}

//****************************************************
// 絞り込みがカテゴリしか無い場合想定
//****************************************************

if($('#refineNavWrap > li').size() == 1){
	$('#refineNavWrap').addClass('column-1');
}

//****************************************************
// 絞り込みの展開
//****************************************************

$(document).on('click','#refineNavWrap .dpMenu.current > a',function(){
	if (!$(this).closest('.dpMenu').hasClass('noDp')) {
		if(!$(this).closest('.dpMenu').hasClass('active')){
			$(this).closest('.dpMenu').addClass('active');
			$(this).closest('.dpMenu').siblings().removeClass('active');
		}else{
			$(this).closest('.dpMenu').removeClass('active');
		}
	}
});

$(document).on('click',function(e){
	if($('#refineNavWrap').size()){
		if(!$.contains($('#refineNavWrap')[0],e.target)){
			$('#refineNavWrap .dpMenu').removeClass('active');
		}
	}
});

$(document).on('click','#refineNavWrap .dpMenu .closeBtn',function(){
	$(this).closest('.dpMenu').removeClass('active');
});

//****************************************************
// 絞り込みのniceScroll設定
//****************************************************

$('#refineNavWrap .dpMenu .dpMenuInner nav ul').each(function(){
	$(this).niceScroll({
		cursorcolor:'#bbb',
		cursorborderradius:'4px',
		cursorborder:'none',
		cursorwidth:'15',
		cursoropacitymin:'0.7',
		cursoropacitymax:'0.7',
		nativeparentscrolling:false
	});
});

$(document).on('oTransitionEnd mozTransitionEnd webkitTransitionEnd transitionend','#refineNavWrap .dpMenu .dpMenuInner',function(){
	$('#refineNavWrap .dpMenu .dpMenuInner nav ul').getNiceScroll().resize();
});

$(window).on('load resize',function(){
	$('#refineNavWrap .dpMenu .dpMenuInner nav ul').getNiceScroll().resize();
});

//****************************************************
// 詳細ポップアップを展開
//****************************************************

var itemDetailHTML;

$('.mdl_itemDetail').on('click',function(){
	itemDetailHTML = $(this).closest('.btn01').next('.popup').prop('outerHTML');
});

$('.mdl_itemDetail').magnificPopup({
	type:'inline',
	fixedContentPos:true,
	fixedBgPos:true,
	overflowY:'auto',
	closeBtnInside:true,
	midClick:true,
	removalDelay:500,
	mainClass:'mfp-closeInner mfp-animated fadeIn',
	callbacks: {
		beforeOpen:function(){
			$('#itemDetail .pt_modal_01-inner').html(itemDetailHTML);
			var scrollbarWidth = window.innerWidth - document.body.clientWidth;
			
			if(m.w_min(801) || IE8){				
				$('#gHeader,#gFooter,#gFooter .deliveringWrap-wrap,#dispSelected').css({ paddingRight:scrollbarWidth });
			}
			
			$('html').css({ marginRight:scrollbarWidth });
		},
		close:function(){
			$('#gHeader,#gFooter,#gFooter .deliveringWrap-wrap,#dispSelected').removeAttr('style');
			$('html').css({ marginRight:0 });
		},
		afterClose: function() {
			$('#itemDetail .pt_modal_01-inner').empty();
		}
	}
});

//****************************************************
// checkboxの判定
//****************************************************

var checkedCount = $('#menuLIstWrap.combo .list input:checked').length;

if(0 < checkedCount){
	$('#dispSelected').addClass('active');
}

// フロント作成側で制御する為、コメントアウト
//$('#menuLIstWrap.combo .list input').change(function(){
//	checkedCount = $('#menuLIstWrap.combo .list input:checked').length;
//
//	if(0 < checkedCount){
//		$('#dispSelected').addClass('active');
//	}else{
//		$('#dispSelected').removeClass('active');
//	}
//});

});// [END]