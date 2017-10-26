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

var modalInnerHTML;
var paramOrderId

$('.mdl_inline').on('click',function(){
	modalInnerHTML = $(this).closest('.btn01').find('[name=dialogMsg]').text()
	param = $(this).closest('.btn01').find('[name=delOrderId]').text()
	$('#orderId').val(param);
});

$('.mdl_inline').magnificPopup({
	removalDelay:500,
	mainClass:'mfp-closeInner mfp-animated fadeIn',
	callbacks: {
		beforeOpen:function(){
			$('#deleteModal .pt_modal_01-inner').html(modalInnerHTML);
		},
		afterClose: function() {
			$('#deleteModal .pt_modal_01-inner').empty();
		}
	}
});

}); // [END]