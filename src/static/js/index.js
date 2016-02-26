
var isLogin = $.cookie('isLogin')

if(!isLogin){
	location.href = 'login.html'
}
$.ajax({
	url: '/queryCardAll',
	type: 'GET',
	dataType: 'json',
	data: {},
	success: function(res){
		console.log(res);
	}
})