/* ===================================================================
javascript information

File Name  : function.js
Author     :
Style Info :
=================================================================== */

$(function(){

//****************************************************
// ラジオボタン - 要素の表示、非表示
//****************************************************

$('.tgl_radio').each(function(){
	var thisName = $(this).attr('name');

	$('input[name="' + thisName + '"]').each(function(){
		var tglTarget = $(this).attr('data-target');

		if($(this).prop('checked')){
			$('.tgl_elm[data-target="' + tglTarget + '"]').fadeIn(100);
		}else{
			$('.tgl_elm[data-target="' + tglTarget + '"]').hide();
		}
	});
});

$('.tgl_radio').on('change',function(){
	var thisName = $(this).attr('name');

	$('input[name="' + thisName + '"]').each(function(){
		var tglTarget = $(this).attr('data-target');

		if($(this).prop('checked')){
			$('.tgl_elm[data-target="' + tglTarget + '"]').fadeIn(100);
		}else{
			$('.tgl_elm[data-target="' + tglTarget + '"]').hide();
		}
	});
});

//****************************************************
// セレクトボックス - 要素の表示、非表示
//****************************************************

$('.tgl_select').each(function(){
	var tglTarget = $(this).find('option:selected').attr('data-target');
	var tglSiblingsElm = $(this).find('option:selected').siblings();

	$('.tgl_elm[data-target="' + tglTarget + '"]').fadeIn(100);

	$(tglSiblingsElm).each(function(){
		var tglTargetSiblings = $(this).attr('data-target');

		$('.tgl_elm[data-target="' + tglTargetSiblings + '"]').hide();
	});
});

$('.tgl_select').on('change',function(){
	var tglTarget = $(this).find('option:selected').attr('data-target');
	var tglSiblingsElm = $(this).find('option:selected').siblings();

	$('.tgl_elm[data-target="' + tglTarget + '"]').fadeIn(100);

	$(tglSiblingsElm).each(function(){
		var tglTargetSiblings = $(this).attr('data-target');

		$('.tgl_elm[data-target="' + tglTargetSiblings + '"]').hide();
	});
});

$(document).on('click','#buttonmember', function(){
	$("#buttonmember").addClass("closed");
});

$(document).on('click','#buttonguest', function(){
	$("#buttonguest").addClass("closed");
});

}); // [END]