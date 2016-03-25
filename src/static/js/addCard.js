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
			$('#type').change(function(event) {
				var num = $('#num').parent().prev()
				var total = $('#total').parent().prev()
				var type = event.target.value
				if(type==1||type==2){
					total.html('总额：')
					num.html('余额：')
					total.val(100)
				}
				if(type==3||type==4){
					total.html('总次数：')
					num.html('已用次数：')
					total.val(10)
				}
				$(this).attr('disabled',true)
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
				that.getRecord()
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
			if(str=='add'){
				that.submitInfo(data)
			}else{
				that.upInfo(data)
				var recordData = {
					cardNo : data.cardNo,
					num : data.num,
					time : A.getDate(new Date()),
					total : data.total
				}
				that.addRecord(recordData)
			}
		},
		submitInfo: function(data){	
			data.date = A.getDate()
			// data.total = 20
			// data.num = 0
			$.ajax({
				url: '/addCard',
				type: 'GET',
				dataType: 'json',
				data: data,
				success: function(res){
					alert('添加成功');
				},
				error: function(res){
					alert('添加出错');
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
					alert('修改成功');
				},
				error: function(res){
					alert('修改出错');
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
					alert('网络错误');
				}
			})
		},
		addRecord: function(data){
			var that = this
			$.ajax({
				url: '/addRecord',
				type: 'GET',
				dataType: 'json',
				data: data,
				success: function(res){
					// that.showRecord(res.data)
				},
				error: function(res){
					alert('网络错误');
				}
			})
		},
		getRecord: function(){
			var that = this,
				params = A.getParams()
			if(!params.id) return
			$.ajax({
				url: '/getRecord',
				type: 'GET',
				dataType: 'json',
				data: params,
				success: function(res){
					that.showRecord(res.data)
				},
				error: function(res){
					alert('网络错误');
				}
			})
		},
		showInfo: function(data){
			var doms = $('.main-box .form-control');
			doms.each(function(index, el) {
				el.value = data[el.id]
			});
		},
		showRecord: function(data){
			var that = this
			if(data.length){
				var html = $('<table class="table table-hover table-bordered"><thead><tr><th class="">id</th><th class="">卡号</th><th class="">使用次数</th><th class="">总数</th><th class="">时间</th></tr></thead><tbody></tbody></table>')
				$.each(data,function(index, el) {
					html.find('tbody').append('<tr><td>'+el.id+'</td><td>'+el.cardNo+'</td><td>'+el.consumption+'</td><td>'+el.total+'</td><td>'+A.getDate(el.time)+'</td></td></tr>')
				})
				$('.main-table').html(html)
			}else{
				$('.main-table').html('')
			}
		}
	}
	cardInfo.init()
})(my)
