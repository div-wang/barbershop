;(function(w){
	var isLogin = $.cookie('isLogin'),
		url = location.href

	if(!isLogin&&!url.match('login')){
		location.href = 'login.html'
	}

    if (window.performance && window.performance.getEntries) {
	    var result = [];
	    // 获取当前页面所有请求对应的PerformanceResourceTiming对象进行分析
	    window.performance.getEntries().forEach(function (perf) {
	        result.push({
	            'url': perf.name,
	            'entryType': perf.entryType,
	            'type': perf.initiatorType,
	            'duration(ms)': perf.duration
	        });
	    });
	    // 控制台输出统计结果
	    console.table(result);
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
        getDate: function(time){
        	String.prototype.towStr = function(ch, length) {
			    var str = this;
			    for(var i=0;i<length - this.length; i++)
			        str = ch + str;
			  	return str;
			}
        	var date = time ? new Date(time):new Date(),
        		year = date.getFullYear(),
        		month = (date.getMonth() + 1).toString().towStr(0,2),
        		day = date.getDate().toString().towStr(0,2),
        		hours = date.getHours().toString().towStr(0,2),
        		Minutes = date.getMinutes().toString().towStr(0,2)
        	return year+'-'+month+'-'+day+' '+hours+':'+Minutes
        },
        resize: function(){
			var height = window.innerHeight,
				width = window.innerWidth;
			$('.main-left,.main-right').height(height)
			$('.main-box').height(height-120)
			$(window).resize(function(event) {
				$('.main-left,.main-right').height(height)
				$('.main-box').height(height-120)
			});
		},
		extend: function(target){
		    var len = arguments.length,
		        index = 1,
		        first = arguments[0];
		    if(typeof target == 'boolean'){
		        if(target) first = {};
		        else{
		            first = arguments[1];
		            index = 2;
		        }
		    }
		    for(; index < len; index++){
		        var o = arguments[index];
		        for(i in o) if(o[i] !== undefined) first[i] = o[i];
		    }
		    return first;
		},
		menuActive: function(){
			var menuIndex = 0,
				url = w.location.href
			if(url.match('card')){
				menuIndex = 1
			}
			if(url.match('person')){
				menuIndex = 2
			}
			if(url.match('setting')){
				menuIndex = 3
			}
			$('.main-left a').eq(menuIndex).addClass('active') 
		},
		tips: function(msg){
			if($('.tips').length>0){
				$('.tips').html(msg).fadeIn(200)
			}else{
				var html = $('<section class="tips">'+msg+'</section>').width(window.innerWidth-60)
				$(document.body).append(html)
			}
			setTimeout(function(){
				$('.tips').fadeOut(200)
			}, 2000);
		},
		getText: function(i){
			var arr = ['全部','7折卡','8折卡','剪头卡','洗头卡']
			return arr[i]
		}
	}
})(this)
