;(function(A){
	A.resize()
	A.menuActive()
	var cardInfo = {
		type: '',
		init: function(type){
			var that = this
			that.type = type
			$('#submitInfo').on('click', function(event) {
				that.getData('add')
			});
			$('#updateInfo').on('click', function(event) {
				that.getData('up')
			});
			$('#birth').datetimepicker({
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0,
                format: 'yyyy-mm-dd',
                pickerPosition: "bottom-left-right-top"
            }).on('changeDate', function(e) {
                var now = new Date();
                if(now < e.date){
                	A.tips('出生日期不能超过当前日期')
                	e.target.value = A.getDate(now)
                }else{
                	var age = now.getFullYear()-e.date.getFullYear()
                	if(now.getMonth()<e.date.getMonth()){
                		age-=1
                	}else if(now.getMonth()=e.date.getMonth()&&now.getDate()<e.date.getDate()){
                		age-=1
                	}
                	$('#age').val(age)
                }
            });
			if(location.href.match('Edit')){
				that.getInfo()
			}
		},
		getData:function(str){
			var that = this,
				data = {},
				doms = $('.main-box .form-control')
			doms.each(function(index, el) {
				var val = el.value
				if(val==='0'||val===''){
					if(el.id=='age'&&val==='0') {
						data[el.id] = el.value
						return
					}
					$('#'+el.id).parent().addClass('has-error')
					$('#'+el.id).parent().next().removeClass('hide')
				}else{
					data[el.id] = el.value
					$('#'+el.id).parent().removeClass('has-error')
					$('#'+el.id).parent().next().addClass('hide')
				}
			})
			if(data.type==0){
				A.tips('类型是必选的')
				return
			}else if(!/.{0,5}$/.test(data.name)){
				A.tips('姓名过长')
				return
			}else if(!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(data.phone)){
				A.tips('请输入正确的手机号')
				return
			}else if(!/^\d{7}$/.test(data.cardNo)){
				A.tips('请输入7位数字的卡号')
				return
			}
			str=='add'?that.submitInfo(data):that.upInfo(data)
		},
		submitInfo: function(data){	
			data.date = A.getDate()
			data.total = 20
			data.num = 0
			$.ajax({
				url: '/addCard',
				type: 'GET',
				dataType: 'json',
				data: data,
				success: function(res){
					console.log(res);
				},
				error: function(res){
					console.log(res);
				}
			})
		},
		upInfo: function(data){
			data.id = A.getParams().id
			$.ajax({
				url: '/upCard',
				type: 'GET',
				dataType: 'json',
				data: data,
				success: function(res){
					console.log(res);
				},
				error: function(res){
					console.log(res);
				}
			})
		},
		getInfo: function(){
			var that = this,
				params = A.getParams()
			if(!params.id) return
			$.ajax({
				url: '/getCard',
				type: 'GET',
				dataType: 'json',
				data: params,
				success: function(res){
					that.showInfo(res.data[0])
				},
				error: function(res){
					console.log(res);
				}
			})
		},
		showInfo: function(data){
			var doms = $('.main-box .form-control');
			doms.each(function(index, el) {
				el.value = data[el.id]
			});
		}
	}
	cardInfo.init()
})(my)
