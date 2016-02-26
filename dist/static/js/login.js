
$('#submit-login').on('click',function(event) {
	var userName = $('#username').val()
	var password = $('#password').val()
	var data = {
		userName:userName,
		password:password
	}
	if(userName==''){
		alert('用户名不能为空')
		return
	}
	if(password==''){
		alert('密码不能为空')
		return
	}
	$.ajax({
		url: '/login',
		type: 'GET',
		dataType: 'json',
		data: data,
		success: function(res){
			if(res.rCode==2000){
				alert('登陆成功')
				$.cookie('isLogin',res.cookie, { expires: 1, path: '/' })
				location.href = 'index.html'
			}else{
				alert(res.rMsg)
			}
		}
	})
});

