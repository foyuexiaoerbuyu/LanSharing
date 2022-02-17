
//复制
function copyStr(str) {
  // var text = '被复制的内容，啦啦啦~';
  var text = str;
	if (navigator.clipboard) {
		// clipboard api 复制
		navigator.clipboard.writeText(text);
	} else {
		var textarea = document.createElement('textarea');
		document.body.appendChild(textarea);
		// 隐藏此输入框
		textarea.style.position = 'fixed';
		textarea.style.clip = 'rect(0 0 0 0)';
		textarea.style.top = '10px';
		// 赋值
		textarea.value = text;
		// 选中
		textarea.select();
		// 复制
		document.execCommand('copy', true);
		// 移除输入框
		document.body.removeChild(textarea);
	}
	// $("#demo").append("  "+text).append('<br/>');
	return text;
}

//复制并输出
function outCopyStr(str) {
	var text = copyStr();
	$("#demo").append("  "+text).append('<br/>');
	return text;
}




//保存文字到文件 参1:文件名,参2:文件内容  下载文件
//示例:download('hello.txt','This is the content of my file ?');
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.click();
}

// $(function(){
    //执行方法3
	// $.myFunction3();
    //执行方法4
	//注意，在执行方法4的时候,必须要对象来调用，比如通过标签选择器$("button").myMethod(args);
	// $("对象").myFunction4();
// });

//----------------------随机数--------------------https://juejin.cn/post/6971687263562383368
//取得[n,m]范围内随机数
function fullClose(n,m){
    let result = Math.random()*(m+1-n)+n;
    while(result>m){
        result = Math.random()*(m+1-n)+n;
    }
    return result;
}
//取得(n,m)范围随机数
function fullOpen(n,m){
    let result = Math.random()*(m-n)+n;
    while(result == n){
        result = Math.random()*(m-n)+n;
    }
    return result;
}
//取得(n,m]范围随机数
function leftOpen(n,m){
    let result = Math.random()*(m-n+1)+n-1;
    while(result<n){
        result = Math.random()*(m-n+1)+n-1;
    }
    return result;
}
//生成n位数字字符串
function randomNum(n){
    let res = ''
    for(let i=0;i<n;i++){
        res += Math.floor(Math.random()*10);
    }
    return res;
}
//生成n位数字字母混合得字符串
function generateMixed(n){
    let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let res = '';
    for(let i=0;i<n;i++){
        let id = Math.floor(Math.random()*36);
        res += chars[id]
    }
    return res;
}
//-----------------随机身份证号码---------------------
// 根据前17位生成末位
// 生成随机数字，max限制最大值，base限制最小值
function getRandom(max, base) { 
    return Math.floor(Math.random() * max + (base ? base : 0));
}

// 根据前17位生成末位
function cnNewID(idcard) {
    var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
    var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2]; // 校验码
    var sum = 0, idx;
    for (var j = 0; j < 17; j++) {
      // 对前17位数字与权值乘积求和
      sum += parseInt(idcard[j], 10) * arrExp[j];
    }
    return arrValid[sum % 11];
}

// 生成身份证号// console.log(getIdcard()) // 身份证号
function getIdcard() {
    var idcard = '';
    for(var i = 0; i < 18; i++) {
        if(i < 6) {
            idcard += getRandom(10)
        }else if(i == 6) {
            idcard += getRandom(2, 1) //年份第一位仅支持1和2
        }else if(i == 7) { 
            idcard += idcard[6] == '1' ? 9 : 0;//两位年份规则，仅支持19和20
        }else if(i == 8) {
            idcard += idcard[6] == '1' ? getRandom(7, 3) : getRandom(2); //三位年份规则，仅支持193-199、200、201这些值
        }else if(i == 9) {
            idcard += getRandom(10) //四位年份规则,0-9
        }else if(i == 10) {
            idcard += getRandom(2);//首位月份规则
        }else if(i == 11) {
            idcard += idcard[10] == '0' ? getRandom(9, 1) : getRandom(3);//末位月份规则
        }else if(i == 12) {
            var maxDays = new Date(idcard.substr(6, 4), idcard.substr(10, 2), 0).getDate(); // 获取当月最大天数
            var day = getRandom(maxDays, 1)
            idcard += day < 10 ? ('0' + day) : day;
            i++
        }else if(i > 13 && i < 17) {
            idcard += getRandom(10)
        }else if(i == 17) {
            idcard += cnNewID(idcard);
        }
    }
	
    return idcard;
}
// 生成随机姓名
function getName(){
 var familyNames = new Array(
		 "赵",    "钱",    "孙",    "李",    "周",    "吴",    "郑",    "王",    "冯",    "陈",
		 "褚",    "卫",    "蒋",    "沈",    "韩",    "杨",    "朱",    "秦",    "尤",    "许",
		 "何",    "吕",    "施",    "张",    "孔",    "曹",    "严",    "华",    "金",    "魏",
		 "陶",    "姜",    "戚",    "谢",    "邹",    "喻",    "柏",    "水",    "窦",    "章",
		 "云",    "苏",    "潘",    "葛",    "奚",    "范",    "彭",    "郎",    "鲁",    "韦",
		 "昌",    "马",    "苗",    "凤",    "花",    "方",    "俞",    "任",    "袁",    "柳",
		 "酆",    "鲍",    "史",    "唐",    "费",    "廉",    "岑",    "薛",    "雷",    "贺",
		 "倪",    "汤",    "滕",    "殷",    "罗",    "毕",    "郝",    "邬",    "安",    "常",
		 "乐",    "于",    "时",    "傅",    "皮",    "卞",    "齐",    "康",    "伍",    "余",
		 "元",    "卜",    "顾",    "孟",    "平",    "黄",    "和",    "穆",    "萧",    "尹"
		 );
 var givenNames =  new Array(
		 "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
		 "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
		 "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
		 "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
		 "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
		 "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
		 "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
		 "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
		 "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
		 "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
		 );

 var i = parseInt(10 * Math.random())*10 + parseInt(10 * Math.random());
 var familyName = familyNames[i];

 var j = parseInt(10 * Math.random())*10 + parseInt(10 * Math.random());
 var givenName = givenNames[i];

 var name = familyName + givenName;
 // var x = document.getElementsByName("client_name");
 // for (var i = 0; i < x.length; i++) {
	 // var o = x[i];
	 // o.value = name;
 // }
return name;
}
function formatTimestamp() {
    var dateObj = new Date();
    
    var year = dateObj.getYear() + 1900;
    var month = dateObj.getMonth() + 1;
    var theDate = dateObj.getDate();
    var hour = dateObj.getHours();
    var minute = dateObj.getMinutes();
    var second = dateObj.getSeconds();
    return year +"-"+ month +"-" + theDate + " "+ hour +":"+ minute +":"+ second;     
}

//格式化时间 dateFormat("YYYY-mm-dd HH:MM:SS")  最好使用http://momentjs.cn/
function dateFormat(fmt) {
	let date = new Date()
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}