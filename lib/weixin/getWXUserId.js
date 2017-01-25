
function getId(res,app){
  	var appId = 'wxe41ec6799091842a';
  	var secretKey = 'f1e7ecc246c7f0b6a0304c739b47870d';
	var host = "https://api.weixin.qq.com/sns/jscode2session?appid="+appId+"&secret="+secretKey+"&js_code="+res.code+"&grant_type=authorization_code";
	try{
		app.get(host, (res) => {
		  console.log('statusCode:', res);
		}).on('error', (e) => {
		  console.error(e);
		});			
	}catch(e){
		console.log(e);
	}
}

module.exports = getId
