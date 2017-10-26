/*<![CDATA[*/
$(function(){
	
	var hiddenTag = document.getElementById("author");
	 // URL追加外の文字
	 var notAddWord = document.getElementById("notAddWord");
	var hiddenTag2 = document.getElementById("tieupid");

	if(null != hiddenTag && "" != hiddenTag.value) {
		 
		 // <a>タグの設定
		 var aTags = document.getElementsByTagName("a");
		 var aTagsLength = aTags.length;
		 var k = 0;
		 
		 var paramsArray = [];
		 paramsArray['author'] = hiddenTag.value;
		 
		 while(aTagsLength > k) {
			 
			 var aTagHref =  aTags[k].href;
			 
			 if (null == aTagHref.match(hiddenTag.value) && null != notAddWord) {
				 
				 var notAddWordArray = notAddWord.value.split(",");
				 var notAddWordArrayLength = notAddWordArray.length;
				 var l = 0;
				 var addUrlFlg = true;
				 
				 while(notAddWordArrayLength > l) {
					 
					 var replaceStr = notAddWordArray[l];

					 if (null == aTagHref || "" == aTagHref || aTagHref.match(replaceStr)) {
						 
						 addUrlFlg = false;
						 break;
					 }
					 l++;
				 }
				 
				 if (addUrlFlg) {
					 aTags[k].href = setParameter(aTagHref, paramsArray);
				 }
			 }
			 
			 k++;
		 }
		 
		 if(null == document.URL.match(hiddenTag.value) &&  null != notAddWord) {
			 
			 history.replaceState('','',setParameter(location.href, paramsArray));
		 }
	 }
	if(null != hiddenTag2 && "" != hiddenTag2.value) {
		 
		 // <a>タグの設定
		 var aTags = document.getElementsByTagName("a");
		 var aTagsLength = aTags.length;
		 var k = 0;
		 
		 var paramsArray = [];
		 paramsArray['tieupid'] = hiddenTag2.value;
		 
		 while(aTagsLength > k) {
			 
			 var aTagHref =  aTags[k].href;
			 
			 if (null == aTagHref.match(hiddenTag2.value) && null != notAddWord) {
				 
				 var notAddWordArray = notAddWord.value.split(",");
				 var notAddWordArrayLength = notAddWordArray.length;
				 var l = 0;
				 var addUrlFlg = true;
				 
				 while(notAddWordArrayLength > l) {
					 
					 var replaceStr = notAddWordArray[l];

					 if (null == aTagHref || "" == aTagHref || aTagHref.match(replaceStr)) {
						 if ('author' != replaceStr) {
						 	addUrlFlg = false;
						 	break;
						 }
					 }
					 l++;
				 }
				 
				 if (addUrlFlg) {
					 aTags[k].href = setParameter(aTagHref, paramsArray);
				 }
			 }
			 
			 k++;
		 }
		 
		 if(null == document.URL.match(hiddenTag2.value) &&  null != notAddWord) {
			 
			 history.replaceState('','',setParameter(location.href, paramsArray));
		 }
	 }
	
    //パラメータを設定したURLを返す
    function setParameter(aTagHref ,paramsArray ) {
        
        for ( key in paramsArray ) {
        	aTagHref += (aTagHref.indexOf('?') == -1) ? '?':'&';
        	aTagHref += key + '=' + paramsArray[key];
        }
        return aTagHref;
    }
});
/*]]>*/