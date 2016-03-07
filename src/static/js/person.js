;(function(A){
	A.resize()
	A.menuActive()
	var person = {
		init: function(){
			var that = this
			$('#search').on('click', function(event) {
				var data = {},
					name = $('#name').val(),
				    phone = $('#phone').val()
				if(name!=''){
					data.name = name
				}
				if(phone!=''){
					data.phone = phone
				}
				that.getData(data)
			});
			$('#search').click();

		},
		showList:function(res){
			var html = $('<table class="table table-hover table-bordered"><thead><tr><th class="">会员卡号</th><th class="">姓名</th><th class="">性别</th><th class="">电话</th><th class="">出生日期</th></tr></thead><tbody></tbody></table>')
			$.each(res.data,function(index, el) {
				html.find('tbody').append('<tr><td>'+el.cardNo+'</td><td>'+el.name+'</td><td>'+(el.sex==1?'男':'女')+'</td><td>'+el.phone+'</td><td>'+el.birth.toString()+'</td></tr>')
			});
			$('.main-table').html(html)
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
				url: '/queryPersonAll',
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
	person.init()
})(my);
