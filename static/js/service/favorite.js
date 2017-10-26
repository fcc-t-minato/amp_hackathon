function setFavorite(sender, regist, onsuccess){
	var url = regist ? sender.data('regist_url') : sender.data('delete_url');
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'json',
		success: onsuccess,
	});
}