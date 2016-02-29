
var isLogin = $.cookie('isLogin')

if(!isLogin){
	location.href = 'login.html'
}
<<<<<<< HEAD
$('#search').on('click', function(event) {
	var data = {},
		name = $('#name').val(),
	    phone = $('#phone').val(),
	    cardType = $('#cardType').val();
	if(name!=''){
		data.name = name
	}
	if(phone!=''){
		data.phone = phone
	}
	if(cardType!=''){
		data.cardType = cardType
	}
	$.ajax({
		url: '/queryCardAll',
		type: 'GET',
		dataType: 'json',
		data: data,
		success: function(res){
			console.log(res);
		}
	})
});
