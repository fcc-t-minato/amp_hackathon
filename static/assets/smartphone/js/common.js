/* ===================================================================
javascript information

File Name  : common.js
Author     :
Style Info :
=================================================================== */

//====================================================================
//
// 基本設定
//
//====================================================================

//****************************************************
// pgwBrowserの変数をセット
//****************************************************

var pgwBrowser = $.pgwBrowser();

// browser
var browserName = pgwBrowser.browser.name;
var browserGroup = pgwBrowser.browser.group;
var browserMajorVer = pgwBrowser.browser.majorVersion;

// os
var osName = pgwBrowser.os.name;
var osGroup = pgwBrowser.os.group;
var osMajorVer = pgwBrowser.os.majorVersion;

// userAgent
var userAgent = pgwBrowser.userAgent;

// viewport
var viewportW = pgwBrowser.viewport.width;
var viewportH = pgwBrowser.viewport.height;

//****************************************************
// 変数基本設定
//****************************************************

// IE8
var IE8 = (browserName == 'Internet Explorer' && browserMajorVer == 8);

// matchMedia
var m = new windowMatchMedia();

function windowMatchMedia(){
	if(!IE8){
		this.w_min = function(width){
			width = width || 801;
			return window.matchMedia('(min-width:' + width + 'px)').matches;
		};
		this.w_max = function(width){
			width = width || 800;
			return window.matchMedia('(max-width:' + width + 'px)').matches;
		};
		this.h_min = function(height){
			height = height || 0;
			return window.matchMedia('(min-height:' + height + 'px)').matches;
		};
		this.h_max = function(height){
			height = height || 1000;
			return window.matchMedia('(max-height:' + height + 'px)').matches;
		};
		this.or_x = function(){
			return window.matchMedia('(orientation:landscape)').matches;
		};
		this.or_y = function(){
			return window.matchMedia('(orientation:portrait)').matches;
		};
	}else{
		this.w_min = function(){ return false; };
		this.w_max = function(){ return false; };
		this.h_min = function(){ return false; };
		this.h_max = function(){ return false; };
		this.or_x = function(){ return false; };
		this.or_y = function(){ return false; };
	}
}

// windowSize
var w = new windowSize();

function windowSize(){
    this.w = function(){
        return $(window).width();
    };
    this.h = function(){
        return $(window).height();
    };
	this.s = function(){
        return $(window).scrollTop();
    };
}

// デバイスの判定
var _ua = userAgent.toLowerCase();
var check_ua = {};

check_ua.mobile = (_ua.indexOf('windows') != -1 && _ua.indexOf('phone') != -1) || _ua.indexOf('iphone') != -1 || _ua.indexOf('ipod') != -1 || (_ua.indexOf('android') != -1 && _ua.indexOf('mobile') != -1) || (_ua.indexOf('firefox') != -1 && _ua.indexOf('mobile') != -1) || _ua.indexOf('blackberry') != -1;

check_ua.tablet = (_ua.indexOf('windows') != -1 && _ua.indexOf('to_ua.h') != -1 && _ua.indexOf('tablet pc') == -1) || _ua.indexOf('ipad') != -1 || (_ua.indexOf('android') != -1 && _ua.indexOf('mobile') == -1) || (_ua.indexOf('firefox') != -1 && _ua.indexOf('tablet') != -1) || _ua.indexOf('kindle') != -1 || _ua.indexOf('silk') != -1 || _ua.indexOf('playbook') != -1;

check_ua.pc = !check_ua.mobile && !check_ua.tablet;


// androidのみキーボード表示時フッタ固定解除
function inputBind(element) {
    $(element).each(function(i, elem){
        var val = $(elem).serializeArray();

        $(val).each(function(n, prp){
            var containerPd = 0;
            var containerPad = 0;
            var setAppPd = 0;
            // フォーカスされた場合
            $(document).on('focus', "[name='"+prp.name+"']", function(){
                $('#gFooter').css('position', 'relative');

                if($('#container').css('padding-bottom')) {
                    containerPd = $('#container').css('padding-bottom');
                    $('#container').css('padding-bottom', '-='+containerPd);
                }
                if ($('#container').css('padding')) {
                    containerPad = $('#container').css('padding');
                }

                if($('.set_app #container').css('padding-bottom')) {
                    setAppPd = $('.set_app #container').css('padding-bottom');
                    $('.set_app #container').css('padding-bottom', '-='+setAppPd);
                }
                $('#dispApp').hide();

            // フォーカス外れた場合
            }).on('blur', "[name='"+prp.name+"']", function(){
                $('#gFooter').css('position', 'fixed');

                if(containerPd != 0) {
                    $('#container').css('padding-bottom', '+='+containerPd);
                }
                if(setAppPd != 0) {
                    $('.set_app #container').css('padding-bottom', '+='+setAppPd);
                }
                $('#dispApp').show();
            });
        });
    });
}


//====================================================================
//
// 実行部分
//
//====================================================================

$(function(){

//****************************************************
// htmlにクラスを追加
//****************************************************

// browser addClass
if(browserGroup == 'Chrome'){
	// Chrome
	if(browserName == 'Chrome'){
		$('html').addClass('Chrome').addClass('ver'+browserMajorVer);
	}else if(browserName == 'Chrome Mobile'){
		$('html').addClass('Chrome_Mobile').addClass('ver'+browserMajorVer);
	}else if(browserName == 'Chrome for iOS'){
		$('html').addClass('Chrome_for_iOS').addClass('ver'+browserMajorVer);
	}else if(browserName == 'Chromium'){
		$('html').addClass('Chromium').addClass('ver'+browserMajorVer);
	}else if(browserName == 'Android Browser'){
		$('html').addClass('Android_Browser').addClass('ver'+browserMajorVer);
	}
}else if(browserGroup == 'Firefox'){
	// Firefox
	$('html').addClass('Firefox').addClass('ver'+browserMajorVer);
}else if(browserGroup == 'Explorer'){
	// Explorer
	if(browserName == 'Internet Explorer'){
		$('html').addClass('IE'+browserMajorVer);
	}else if(browserName == 'IEMobile'){
		$('html').addClass('IEMobile').addClass('ver'+browserMajorVer);
	}
}else if(browserGroup == 'Opera'){
	// Opera
	if(browserName == 'Opera'){
		$('html').addClass('Opera').addClass('ver'+browserMajorVer);
	}else if(browserName == 'Opera Mini'){
		$('html').addClass('Opera_Mini').addClass('ver'+browserMajorVer);
	}
}else if(browserGroup == 'Safari'){
	// Safari
	$('html').addClass('Safari').addClass('ver'+browserMajorVer);
}else if(browserGroup == 'Spartan'){
	// Spartan
	$('html').addClass('Spartan').addClass('ver'+browserMajorVer);
}

if(userAgent.indexOf('Edge') > -1){
   $('html').addClass('Edge');
}

// os addClass
if(osGroup == 'Windows'){
	if(osName == 'Windows 2000'){
		$('html').addClass('Windows_2000');
	}else if(osName == 'Windows XP'){
		$('html').addClass('Windows_XP');
	}else if(osName == 'Windows Vista'){
		$('html').addClass('Windows_Vista');
	}else if(osName == 'Windows 7'){
		$('html').addClass('Windows_7');
	}else if(osName == 'Windows 8'){
		$('html').addClass('Windows_8');
	}else if(osName == 'Windows 8.1'){
		$('html').addClass('Windows_8-1');
	}else if(osName == 'Windows 10'){
		$('html').addClass('Windows_10');
	}else{
		$('html').addClass('Windows');
	}
}else if(osGroup == 'Windows Phone'){
	$('html').addClass('Windows_Phone');
}else if(osGroup == 'Chrome OS'){
	$('html').addClass('Chrome_OS');
}else if(osGroup == 'Android'){
	$('html').addClass('Android');
}else if(osGroup == 'iOS'){
	if(osName == 'iPhone'){
		$('html').addClass('iPhone');
	}else if(osName == 'iPad'){
		$('html').addClass('iPad');
	}else if(osName == 'iPod'){
		$('html').addClass('iPod');
	}
	$('html').addClass('iOS');
}else if(osGroup == 'Mac OS'){
	$('html').addClass('Mac_OS');
}else if(osGroup == 'Linux'){
	$('html').addClass('Linux');
}else if(osGroup == 'BlackBerry'){
	$('html').addClass('BlackBerry');
}

// platform addClass
if(check_ua.pc){
	$('html').addClass('device-pc');
}else if(check_ua.tablet){
	$('html').addClass('device-tablet');
}else if(check_ua.mobile){
	$('html').addClass('device-mobile');
}
	

//****************************************************
// ヘッダーメニューの展開
//****************************************************

$(document).on('click','#gHeader .dpMenu > a',function(){
	if(!$(this).closest('.dpMenu').hasClass('active')){
		$(this).closest('.dpMenu').addClass('active').siblings().removeClass('active');
		$('#gHeader').addClass('active');
	}else{
		$(this).closest('.dpMenu').removeClass('active');
		$('#gHeader').removeClass('active');
	}
}).on('click','#gHeader .dpMenu .closeBtn',function(){
	$(this).closest('.dpMenu').removeClass('active');
	$('#gHeader').removeClass('active');
});

$(document).on('click touchend',function(e) {
	if($('#gHeader').size()){
		if(!$.contains($('#gHeader')[0],e.target)){
			$('#gNav03').removeClass('active');
			$('#gNav02').removeClass('active');
			$('#gHeader').removeClass('active');
		}
	}
});

//****************************************************
// ページ上部アプリ部分
//****************************************************

$(document).on('click touchend','#dispApp .closeBtn',function(){
	document.cookie = "isAppClose=" + "close";
	$('body').removeClass('set_app');
});

//****************************************************
// スクロール／ヘッダーの処理
//****************************************************

var startPos = 0;
var minScroll;

$(window).on('load scroll resize',function(){

	var wScroll = $(window).scrollTop();

	if($('body').hasClass('set_app')){
		minScroll = 114;

		if(20 < wScroll){
			$('body').addClass('pos01');
		}else{
			$('body').removeClass('pos01');
		}
	}else{
		minScroll = 47;
	}

	if(wScroll > startPos){
		if(minScroll < wScroll && !$('.dpMenu').hasClass('active')){
			$('#gHeader').addClass('pos01');
		}
	}else{
		$('#gHeader').removeClass('pos01');
	}

	startPos = wScroll;
});

//****************************************************
// セレクトボックスをカスタマイズ
//****************************************************

// iOSのオプション表示を改行に
if(osGroup == 'iOS'){
	var selects = document.querySelectorAll('select');
	for (var i = 0; i < selects.length; i++ ){
		selects[i].appendChild(document.createElement('optgroup'));
	}
}

$('.pt_select_01 select').each(function(){
	var value = $(this).find('option:selected').html();

	$(this).next('.inner').find('span').html(value);
});

$('.pt_select_01 select').on('change',function(){
	var value = $(this).find('option:selected').html();

	$(this).next('.inner').find('span').html(value);
});

//****************************************************
// ページ下部配達中の情報
//****************************************************

$('#gFooter .deliveringWrap').slick({
	lazyLoad:'ondemand',
	accessibility:true,
	fade:false,
	dots:false,
	infinite:false,
	speed:500,
	autoplay:false,
	arrows:true, // > レスポンシブで修正
	prevArrow:'<div class="delivering-slick-prev"></div>', // > レスポンシブで追加
	nextArrow:'<div class="delivering-slick-next"></div>', // > レスポンシブで追加
	slidesToScroll:1,
	swipe:true,
	touchMove:true,
	centerPadding:'0px',
	adaptiveHeight:true,
	slidesToShow:1,
	pauseOnHover:true
});

//****************************************************
// モーダル（magnific-popup）
//****************************************************

$('.mdl_inline').magnificPopup({
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

$('.mdl_ajax').magnificPopup({
	type:'ajax',
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

// リサイズして
// 801以上、且つモーダルが開かれている場合はスクロールバーの調整を追加
// 800以下の場合は追加したスタイルを消しておく

$(window).on('resize',function(){
	if(m.w_min(801) || IE8){
		if($('.mfp-wrap').size()){
			var scrollbarWidth = window.innerWidth - document.body.clientWidth;
			
			$('#gHeader,#gFooter,#gFooter .deliveringWrap-wrap,#dispSelected').css({ paddingRight:scrollbarWidth });
		}
	}else{
		$('#gHeader,#gFooter,#gFooter .deliveringWrap-wrap,#dispSelected').removeAttr('style');
	}
});

//****************************************************
// スムーススクロール
//****************************************************

$(document).on('click','a[class*="scroll"][href^=#]',function(){
	var headerHeight = 0;
	
	if(m.w_min(801) || IE8){
		headerHeight = 132;
	}
	
	var href= $(this).attr('href');
	var target = $(href == '#' || href == '' ? 'html' : href);
	var position = target.offset().top;
	$('html,body').animate({scrollTop:position - headerHeight},500,'swing');
	return false;
});

// URLに#があるときの処理

var loadTimer = false;
var wHash = window.location.hash;

if(wHash){
	window.scrollTo(0,0);
}

$(window).on('load',function(){
	if(loadTimer !== false) {
		clearTimeout(loadTimer);
	}

	loadTimer = setTimeout(function(){
		var headerHeight = 0;
		
		if(m.w_min(801) || IE8){
			headerHeight = 132;
		}
		
		if(wHash){
			var targetId = wHash.replace('#','');

			if(document.getElementById(targetId) != null){
				var target = $(wHash).offset().top;
				$('html,body').animate({scrollTop:target - headerHeight},500,'swing');
			}
		}
	},100);
});

//****************************************************
// アコーディオン開閉 - 汎用
//****************************************************

$(document).on('click','.pt_acd-btn_01',function(){
	var thisElm = $(this);

	if(!$(this).hasClass('active')){
		$(this).next('.pt_acd-box_01').slideDown(300,function(){
			$(thisElm).addClass('active');
		});

		// 先祖に.pt_acd-wrap_01がある場合、その中で一つだけ展開
		if($(this).parents().hasClass('pt_acd-wrap_01')){
			var thisElmWrap = $(this).parents('.pt_acd-wrap_01');

			$(thisElmWrap).find('.pt_acd-btn_01.active').each(function(){
				$(this).next('.pt_acd-box_01').slideUp(300,function(){
					$(this).prev('.pt_acd-btn_01').removeClass('active');
				});
			});
		}
	}else{
		$(this).next('.pt_acd-box_01').slideUp(300,function(){
			$(thisElm).removeClass('active');
		});
	}
});

//****************************************************
//アコーディオン開閉 - 汎用 (任意の場合)
//****************************************************

$(document).on('click','.pt_acd-btn_02',function(){
	var thisElm = $(this);

	if(!$(this).hasClass('active')){
		$(this).next('.pt_acd-box_02').slideDown(300,function(){
			$(thisElm).addClass('active');
		});

		// 先祖に.pt_acd-wrap_01がある場合、その中で一つだけ展開
		if($(this).parents().hasClass('pt_acd-wrap_01')){
			var thisElmWrap = $(this).parents('.pt_acd-wrap_01');

			$(thisElmWrap).find('.pt_acd-btn_02.active').each(function(){
				$(this).next('.pt_acd-box_02').slideUp(300,function(){
					$(this).prev('.pt_acd-btn_02').removeClass('active');
				});
			});
		}
	}else{
		$(this).next('.pt_acd-box_02').slideUp(300,function(){
			$(thisElm).removeClass('active');
		});
	}
});

//****************************************************
// タブ切り替え - 汎用
//****************************************************

if($('.pt_tab-wrap_01').size()){
	$('.pt_tab-wrap_01').each(function(){
		$(this).find('.pt_tab-btn_01').first().addClass('active');
		$(this).find('.pt_tab-box_01').first().show();
	});
}else{
	$('.pt_tab-btn_01').first().addClass('active');
	$('.pt_tab-box_01').first().fadeIn(100);
}

$('.pt_tab-btn_01').on('click',function(){
	var thisElm = $(this);

	// 先祖に.pt_tab-wrap_01がある場合、その中で展開
	if($(this).parents().hasClass('pt_tab-wrap_01')){
		var thisElmWrap = $(this).parents('.pt_tab-wrap_01');
		var index = $(thisElmWrap).find(this).index();

		$(thisElmWrap).find('.pt_tab-btn_01:eq(' + index + ')').addClass('active');
		$(thisElmWrap).find('.pt_tab-box_01:eq(' + index + ')').fadeIn(100);

		$(thisElmWrap).find('.pt_tab-btn_01:not(:eq(' + index + '))').removeClass('active');
		$(thisElmWrap).find('.pt_tab-box_01:not(:eq(' + index + '))').hide();
	}else{
		var index = $(this).index();

		$('.pt_tab-btn_01:eq(' + index + ')').addClass('active');
		$('.pt_tab-box_01:eq(' + index + ')').fadeIn(100);

		$('.pt_tab-btn_01:not(:eq(' + index + '))').removeClass('active');
		$('.pt_tab-box_01:not(:eq(' + index + '))').hide();
	}
});

//****************************************************
// 必須エラーがある場合に前後の余白を調整
//****************************************************

if($('.pt_errorTxt_01').size()){
	$('.pt_errorTxt_01').each(function(){
		$(this).next().css({marginTop:0}).removeClass(function(index,className){
			return (className.match(/\bmT\S+|\bpT\S+/g)||[]).join(' ');
		});

		if($(this).prev().size()){
			$(this).prev().css({marginBottom:0}).removeClass(function(index,className){
				return (className.match(/\bmB\S+|\bpB\S+/g)||[]).join(' ');
			});

			$(this).css({marginTop:'8px',marginBottom:'6px'});
		}else{
			$(this).css({marginBottom:'6px'});
		}
	});
}

//****************************************************
// floatの高さを揃える
//****************************************************

$(window).on('floatAdjust',function(){
	// PC 2カラム - SP 1カラム
	$('.floatAdj-column-2').each(function(){
		var elm = $(this).children();
		
		if(m.w_min(801) || IE8){
			$(elm).tile(2);
		}else{
			$(elm).css({ height:'auto' });
		}
	});
});

$(window).on('load resize',function(){
	$(this).trigger('floatAdjust');
});

//****************************************************
// .js_link（<a>タグの中のリンク処理）
//****************************************************

$(document).on('click','.js_link',function(e){
	e.stopPropagation();
	e.preventDefault();
	
	location.href = $(this).attr('data-href');
});

//****************************************************
// Androidのソフトウェアキーボード表示時
//****************************************************

if(osGroup == 'Android'){

	// 入力フォームタイプ：text
	inputBind($('input[type="text"]'));

	// 入力フォームタイプ：tel
	inputBind($('input[type="tel"]'));

	// 入力フォームタイプ：email
	inputBind($('input[type="email"]'));

	// 入力フォームタイプ：password
	inputBind($('input[type="password"]'));
	
	// 入力フォームタイプ：textarea
	inputBind($('textarea'));

}

}); //[END]