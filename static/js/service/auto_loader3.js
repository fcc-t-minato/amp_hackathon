$(document).ready(function() {
  // 全メニュー用
  if(menuCode == null){
      var menuLIstWrap = document.getElementById("menuLIstWrap");
      var loadinfo = document.getElementById("loadinfo");
      var isLoading = false;
      var getMenuCount = 1; // 0は店舗TOP取得で取得済みなので1からスタート

      window.addEventListener("scroll", onScroll, false);

      function onScroll (e){
          var scrollY = window.scrollY;
          var bodyHeight = document.body.offsetHeight;
          var innerHeight = window.innerHeight;
          if(innerHeight + scrollY > bodyHeight - 300){
              load();
          }
      }

      function load (){
          if (menuLIstWrap != null) {
              if(!isLoading){
	              var MenuCd = getNextMenuCd(getMenuCount);
	              getMenuCount++;
	              if(MenuCd == 'false'){ // 終端の場合
	                  isLoading = true; // これ以上読み込まないようにする
        			  loadinfo.style.display="none"
	              } else {
	            	  var url = location.href;
	            	  if( url.indexOf("?") >= 0 ) {
	            		  url = url.substr(0,url.indexOf("?"))
	            	  }
                      if (url.slice(-1) != "/"){
                          url = url + "/";
                       }
	                  //フラグon
	                  isLoading = true;
	                  loadinfo.innerHTML = '<img src=/assets/smartphone/img/loading_animation_01.gif>';
	                  $.ajax({
	                	    type: 'GET',
	                	    url: url + MenuCd + '/?blckCd=none',
	                	  }).done(function(response) {
	                		  if( response.indexOf('<li class="list auto_loading_item">') >= 0 ){
	                			  // 正常応答　応答データを追加し以降の読み込みを続ける
		                		  menuLIstWrap.innerHTML += response;
		    	                  isLoading = false;
	                		  }　else {
	                			  // 異常応答　応答データを追加せず以降の読み込みを行わない
	                			  loadinfo.style.display="none"
	                		  }
	                		  loadinfo.innerHTML = "";
	                	  }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
                			  loadinfo.style.display="none"
	                		  loadinfo.innerHTML = "";
	                	      failure(XMLHttpRequest, textStatus, errorThrown);
	                	  });
	              }
              }
          }
      }
	  // カテゴリ取得用
	  } else {
	      var loadinfo = document.getElementById("loadinfo");
		  loadinfo.style.display="none"
		  var pathStr = '';
		  if( location.href.indexOf("?") >= 0 ) {
		    pathStr = '&pageNo=';
		  } else {
		    pathStr = '?pageNo=';
		  }
		  path=new Array();
		  path.push(location.href + pathStr);
		  path.push("");
		  $('.auto_loading_contents').infinitescroll({
		        navSelector  : ".auto_loading_contents .navigation",
		        nextSelector : ".auto_loading_contents .navigation a",
		        itemSelector : ".auto_loading_contents .auto_loading_item",
		        dataType : "html",
		        maxPage: lastPage,
		      animate: false,
		        loading:{
		          img: "/assets/smartphone/img/loading_animation_01.gif",
		          msgText: "",
		          finishedMsg: "",
		        },
		//        path: path
		        path: path
		    });
	    }

  		function getNextMenuCd (getMenuCount){
  			var menuCd = 'false';

            var div  = document.getElementsByClassName("category_list");

            if ( getMenuCount < div.length ){
            	menuCd = div[getMenuCount].getAttribute("data-menucd"); //次に取得するメニューコード
            }

  			return menuCd;
  		}
});

