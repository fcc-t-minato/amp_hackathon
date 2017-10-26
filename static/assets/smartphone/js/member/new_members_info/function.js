/* ===================================================================
javascript information

File Name  : function.js
Author     : 
Style Info : 
=================================================================== */

$(function(){

//****************************************************
// 現在地選択⇒郵便番号選択
//****************************************************

$('.mdl_next').magnificPopup({
	items:{
	  src:'#searchZipCode'
	},
	type:'inline',
	fixedContentPos:true,
	fixedBgPos:true,
	overflowY:'auto',
	closeBtnInside:true,
	midClick:true,
	removalDelay:500,
	mainClass:'mfp-closeInner mfp-animated fadeIn',
	callbacks:{
		beforeOpen:function(){
			var scrollbarWidth = window.innerWidth - document.body.clientWidth;

			if(m.w_min(801) || IE8){
				$('#gHeader,#gFooter,#gFooter .deliveringWrap-wrap,#dispSelected').css({ paddingRight:scrollbarWidth });
			}
			
			$('html').css({ marginRight:scrollbarWidth });
		},
		close:function(){
			$('#gHeader,#gFooter,#gFooter .deliveringWrap-wrap,#dispSelected').removeAttr('style');
			$('html').css({ marginRight:0 });
		}
	}
});

/*
var nextKey = 0;

$('.mdl_next').on('click',function(e){
	e.preventDefault();
	nextKey = 1;
	$.magnificPopup.close();
});

$('.mdl_inline').on('mfpAfterClose', function(e) {
	if(nextKey == 1){
		$.magnificPopup.open({
			items:{
			  src:'#searchZipCode'
			},
			type:'inline',
			fixedContentPos:true,
			fixedBgPos:true,
			overflowY:'auto',
			closeBtnInside:true,
			midClick:true,
			removalDelay:500,
			mainClass:'mfp-closeInner mfp-animated fadeIn',
			callbacks: {
				beforeOpen: function() {
					nextKey = 0;
				}
			}
		},0);
	}
});
*/

}); // [END]