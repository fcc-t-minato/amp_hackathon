/* ===================================================================
javascript information

File Name  : function.js
Author     :
Style Info :
=================================================================== */

$(function(){

//****************************************************
// 商品取り消し
//****************************************************

$('.itemClose').click(function(){
    $(this).parents('.itemSummary').css('display','none');
});

//****************************************************
// ラジオボタン - 選択した文言を親のアコーディオンボタンに反映
//****************************************************

$('.acdTxt_radio').each(function(){
	if($(this).prop('checked')){
		var selectedTxt = $(this).parent('label').text();

		$(this).closest('.pt_acd-box_01').prev('.pt_acd-btn_01').text(selectedTxt);
	}
});

$('.acdTxt_radio').on('change',function(){
	if($(this).prop('checked')){
		var selectedTxt = $(this).parent('label').text();

		$(this).closest('.pt_acd-box_01').prev('.pt_acd-btn_01').text(selectedTxt);
	}
});

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

}); // [END]