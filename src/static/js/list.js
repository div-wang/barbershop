;(function(A){
	A.resize()
	A.menuActive()
	var getList = {
		type:'',
		init: function(type){
			var that = this
			that.type = type
			$('#search').on('click', function(event) {
				that.getData(1)
			});
			that.getData(1)
		},
		getData: function(page){
			var that = this,
				onUrl = '/queryPersonAll',
				data = {},
				name = $('#name').val(),
			    phone = $('#phone').val(),
			    cardType = $('#cardType').val()

			if(that.type == 'person'){
				onUrl = '/queryPersonAll'
				if(name!='') data.name = name
				if(phone!='') data.phone = phone
			}
			if(that.type == 'card'){
				onUrl = '/queryCardAll'
				if(name!='') data.name = name
				if(phone!='') data.phone = phone
				if(cardType!='') data.cardType = cardType
			}

			data.pageNum = page-1
			data.pageSize = 10

			$.ajax({
				url: onUrl,
				type: 'GET',
				dataType: 'json',
				data: data,
				success: function(res){
					that.showList(res)
					that.showPage(res)
				},
				error: function(res){
					console.log(res);
				}
			})
		},
		showList:function(res){
			var that = this
			$('.main-tips').addClass('hide')
			if(res.data.length){
				var html = ''
				if(that.type == 'person'){
					html = $('<table class="table table-hover table-bordered"><thead><tr><th class="">姓名</th><th class="">性别</th><th class="">电话</th><th class="">出生日期</th><th class="">会员卡号</th><th class="">操作</th></tr></thead><tbody></tbody></table>')
					$.each(res.data,function(index, el) {
						html.find('tbody').append('<tr><td>'+el.name+'</td><td>'+(el.sex==1?'男':'女')+'</td><td>'+el.phone+'</td><td>'+A.getDate(el.birth)+'</td><td>'+el.cardNo+'</td><td><a class="btn" href="cardEdit.html?id='+el.id+'">查看</a></td></tr>')
					})
				}else{
					html = $('<table class="table table-hover table-bordered"><thead><tr><th class="">会员卡号</th><th class="">会员卡类型</th><th class="">时间</th><th class="">已用次数</th><th class="">操作</th></tr></thead><tbody></tbody></table>')
					$.each(res.data,function(index, el) {
						html.find('tbody').append('<tr><td>'+el.cardNo+'</td><td>'+A.getText(el.type)+'</td><td>'+A.getDate(el.date)+'</td><td>'+el.num+'</td><td><a class="btn" href="cardEdit.html?id='+el.id+'">查看</a></td></tr>')
					})
				}
				$('.main-table').html(html)
			}else{
				$('.main-tips').removeClass('hide')
			}
		},
		showPage: function(res){
			var that = this
			A.page({
		        container: '.main-page',
		        containerClass:'order-pagination',
		        size: 5,
		        pageNumber: res.pageNum,
		        pageSize:10,
		        total: res.total,
		        onPageChange: function(oldPaage, newPage){
		            that.getData(newPage)
		        }
		    })
		}
	}
	if(location.href.match('person')) getList.init('person')
	if(location.href.match('card')) getList.init('card')
	
})(my)
