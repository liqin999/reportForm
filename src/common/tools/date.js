
module.exports = {
  getNowDate: function(format,obj){//获得当前的日期的前N天和前N个月
    var currentdate='';
    var date = new Date();
    var seperator1 = "/";

    var year = date.getFullYear();
    var month = obj.m ? date.getMonth() - (obj.m-1) : date.getMonth() + 1;
    var strDate = obj.d ? date.getDate() - obj.d : date.getDate();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
     }
     if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
     }
     if(format == 'YMD'){
        currentdate = year + seperator1 + month + seperator1 + strDate;
     }else if(format == 'YM'){
        currentdate = year + seperator1 + month;
     }
     
     return currentdate;
  },

  getNowDateTime:function(){//获得当前的日期和时间
  	var date = new Date();
    var seperator1 = "/";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
   },
   dateToMs:function(date){//时间格式转时间戳"2016-4-18 10:45:56"
   	   var getDate = function(strDate) {return date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')')};
       return Ms = Date.parse(new Date(getDate(date)));//毫秒
   },
   msToDateTime:function(ms){
	    var date = new Date(parseInt(ms));
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
	    var _date=Y+M+D;
	    return _date;
   }
 
};