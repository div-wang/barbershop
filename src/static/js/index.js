;(function(A){
	A.resize()
	A.menuActive()
	var card = {
		init: function(){
			var that = this
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
				that.getData(data)
			});
			$('#search').click();

		},
		showList:function(res){
			var html = $('<table class="table table-hover table-bordered"><thead><tr><th class="">会员卡号</th><th class="">会员卡类型</th><th class="">时间</th><th class="">已用次数</th></tr></thead><tbody></tbody></table>')
			$.each(res.data,function(index, el) {
				html.find('tbody').append('<tr><td>'+el.cardNo+'</td><td>'+el.type+'</td><td>'+new Date(el.date).toString()+'</td><td>'+el.num+'</td></tr>')
			});
			$('.main-table').append(html)
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
		            that.loadData(newPage)
		        }
		    })
		},
		getData: function(data){
			var that = this
			$.ajax({
				url: '/queryCardAll',
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
		}
	}
	card.init()
})(my);
