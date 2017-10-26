/* ===================================================================
javascript information

File Name  : function.js
Author     : 
Style Info : 
=================================================================== */

$(function(){

//****************************************************
// 削除確認ポップアップを展開
//****************************************************

var shopInfoHTML;

$('.mdl_inline').on('click',function(){
	shopInfoHTML = $(this).closest('.list').children('a').html();
});

$('.mdl_inline').magnificPopup({
	removalDelay:500,
	mainClass:'mfp-closeInner mfp-animated fadeIn',
	callbacks: {
		beforeOpen:function(){
			$('#deleteModal .pt_modal_01-inner').html(shopInfoHTML);
			
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
			$('#deleteModal .pt_modal_01-inner').empty();
		}
	}
});

}); // [END]