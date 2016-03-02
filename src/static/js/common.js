;(function(w){
	var isLogin = $.cookie('isLogin')

	if(!isLogin){
		location.href = 'login.html'
	}

	w.my = {
		getParams: function(){
            var s = window.location.search.substr(1),
            	o = new Object(),
            	aryVars = s.split('&')
            for ( var i = 0; i < aryVars.length; i++) {
                var index = aryVars[i].indexOf('='),
                	aryPair = [ aryVars[i].substring(0, index),
                    aryVars[i].substring(index + 1) ]
                o[aryPair[0]] = aryPair[1]
            }
            return o
        },
        resize: function(){
			var height = window.innerHeight,
				width = window.innerWidth;
			$('.main-left,.main-right').height(height)
			$(window).resize(function(event) {
				$('.main-left,.main-right').height(height)
			});
		},
		menuActive: function(){
			var menuArr = {index:0,card:1,person:2,setting:3},
				url = w.location.href.split(location.host)[1].split('/')[1].split('.')[0]||'index'
			$('.main-left a').eq(menuArr[url]).addClass('active') 
		},
		tips: function(msg){
			if($('.tips').length>0){
				$('.tips').html(msg).width(window.innerWidth-60)
			}else{
				var html = $('<section class="tips">'+msg+'</section>').width(window.innerWidth-60)
				$(document.body).append(html)
			}
			setTimeout(function(){
				$('.tips').fadeOut('200')
			}, 2000);
		}
	}


})(this);