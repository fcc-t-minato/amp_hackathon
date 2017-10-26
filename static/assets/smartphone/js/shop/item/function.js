/* ===================================================================
javascript information

File Name  : function.js
Author     : 
Style Info : 
=================================================================== */

$(function(){

//****************************************************
// カテゴリコメント開閉
//****************************************************

$(document).on('click','#categoryName.commentBtn',function(){
	var thisElm = $(this);
	
	if(!$(this).hasClass('active')){
		$(this).next('#categoryComment').slideDown(300,function(){
			$(thisElm).addClass('active');
		});
	}else{
		$(this).next('#categoryComment').slideUp(300,function(){
			$(thisElm).removeClass('active');
		});
	}
});

//****************************************************
// 続きを読むボタン
//****************************************************

$('.read_chars60').collapser({
    mode:'chars',
    truncate:60,
	speed:200,
	ellipsis:'...',
	effect:'fade',
	controlBtn:function(){
		return $(this).parent().find('.read_chars60_btn').find('a');
	},
    showText:'続きを読む',
    hideText:'閉じる',
	afterShow:function(){
		$(this).parent().find('.read_chars60_btn').find('a').addClass('active');
	},
	afterHide:function(){
		$(this).parent().find('.read_chars60_btn').find('a').removeClass('active');
	}
});

$('.read_chars385').collapser({
    mode:'chars',
    truncate:385,
	speed:200,
	ellipsis:'...',
	effect:'fade',
    showText:'',
    hideText:'',
});



//****************************************************
// チェックボックスの判定
//****************************************************

$('.pt_acd-box_01').each(function(){
	var checkedCount = $('input:checked',this).length;
	
	if(0 < checkedCount){
		var checkedArray = new Array();
		
		$(this).find('input:checked').each(function(){
			var thisHTML = $(this).next('.type_table').find('.Rcol').html();
			checkedArray.push(thisHTML);
		});
		
		var str = '';
		
		$.each(checkedArray,function(i,val){		
			str += '<li>' + val + '</li>';
		});
		
		$(this).next('.pt_selectedOption_01').html(str).fadeIn(200);
	}
});

$('.pt_acd-box_01 input').change(function(){
	var thisClosest = $(this).closest('.pt_acd-box_01');
	var checkedCount = $(thisClosest).find('input:checked').length;
	
	if(0 < checkedCount){
		var checkedArray = new Array();
		
		$(thisClosest).find('input:checked').each(function(){
			var thisHTML = $(this).next('.type_table').find('.Rcol').html();
			checkedArray.push(thisHTML);
		});
		
		var str = '';
		
		$.each(checkedArray,function(i,val){		
			str += '<li>' + val + '</li>';
		});
		
		$(thisClosest).next('.pt_selectedOption_01').html(str).fadeIn(200);
	}else{
		$(thisClosest).next('.pt_selectedOption_01').empty().hide();
	}
});

}); // [END]