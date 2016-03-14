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
				onUrl = '/queryCardAll',
				data = {},
				name = $('#name').val(),
			    phone = $('#phone').val(),
			    cardType = $('#cardType').val()

			if(name!='') data.name = name
			if(phone!='') data.phone = phone
			if(cardType!='') data.cardType = cardType

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
				var html = $('<table class="table table-hover table-bordered"><thead><tr><th class="">id</th><th class="">姓名</th><th class="">性别</th><th class="">电话</th><th class="">会员卡号</th><th class="">会员卡类型</th><th class="">卡余额/次数</th><th class="">操作</th></tr></thead><tbody></tbody></table>')
				$.each(res.data,function(index, el) {
					var number = el.total-el.num
					html.find('tbody').append('<tr><td>'+el.id+'</td><td>'+el.name+'</td><td>'+(el.sex==1?'男':'女')+'</td><td>'+el.phone+'</td><td>'+el.cardNo+'</td><td>'+A.getText(el.type)+'</td><td>'+number+'</td><td><a class="btn" href="cardEdit.html?id='+el.id+'">查看</a></td></tr>')
				})
				$('.main-table').html(html)
			}else{
				$('.main-table').html('')
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
	getList.init()
	
})(my)
