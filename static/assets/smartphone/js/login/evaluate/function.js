/* ===================================================================
javascript information

File Name  : function.js
Author     : 
Style Info : 
=================================================================== */

$(function(){

//****************************************************
// 評価の変更
//****************************************************

$('.pt_select_01 select').each(function(){
	var rating = $(this).find('option:selected').attr('data-rating');
	var ratingTarget = $(this).closest('.pt_select_01').next('.pt_rating_01').find('span');
	
	ratingSet(ratingTarget,rating);
});

$('.pt_select_01 select').on('change',function(){
	var rating = $(this).find('option:selected').attr('data-rating');
	var ratingTarget = $(this).closest('.pt_select_01').next('.pt_rating_01').find('span');
	
	ratingSet(ratingTarget,rating);
});

function ratingSet(target,val){
	if(val == 5){
		$(target).css({width:'100%'});
	}else if(val == 4.5){
		$(target).css({width:'92%'});
	}else if(val == 4){
		$(target).css({width:'81.5%'});
	}else if(val == 3.5){
		$(target).css({width:'71.5%'});
	}else if(val == 3){
		$(target).css({width:'61%'});
	}else if(val == 2.5){
		$(target).css({width:'50.5%'});
	}else if(val == 2){
		$(target).css({width:'40%'});
	}else if(val == 1.5){
		$(target).css({width:'30%'});
	}else if(val == 1){
		$(target).css({width:'21%'});
	}else{
		$(target).css({width:'0'});
	}
	
	if(val >= 4){
		$(target).addClass('color01');
	}else{
		$(target).removeClass('color01');
	}
}

}); // [END]