var submited = false;

$(document).on("submit", "form", function() {
	if (submited) {
		return false;
	} else {
		submited = true;
		setTimeout(function() {
			submited = false;
		}, 10000);

	}
});