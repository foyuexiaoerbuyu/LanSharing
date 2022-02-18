
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
	$("#demo").append("  "+ copyStr(str)).append('<br/>');
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
//统一社会信用代码
function randomUnifySocialCreditCodes(){
    var items = ['913701037535461553','91370104MA3N1HWC7M','92370112MA3F6JM007','91370100MA3MP74K7A','91370105MA3N4THQ54','91370100MA3FET3J6L','91370181MA3D7J9W3W','91370104MA3M7HJF06','91370104MA3M8MEG6P','91370102MA3F8L9C27','92370181MA3DDKQH4C','92370112MA3F23MB5N','92370112MA3D66LK09','92370104MA3DR08A4D','92370181MA3HJR6U9C','92370104MA3DMG9Y39','91370112MA3MKYYM0X','91370103MA3M0GP13H','92370113MA3HJP4T2C','91370125MA3N0HGNXM','91370100MA3EM1RG0U','91370103MA3DCHFQ4E','91370104MA3MMCX3XA','92370126MA3L7GEE73','91370000562502977H','91370126MA3DKTD3XC','92370113MA3DFQQH17','92370100MA3DHB8AXJ','92370105MA3D51NW24','92370113MA3F31CM19','92370181MA3L74YQXA','91370103MA3DE6QN03','91370105MA3D5LBM9G','91370112MA3F8TED4M','92370125MA3EHX0K1K','91370102MA3L74XN9A','92370124MA3DL6JQ9P','92370102MA3F5BPN0F','91370102MA3M2EF82T','91370100MA3F54XP92','91370102MA3MPDCG1A','91370128MA3M1N7U0J','92370103MA3EQCNC42','91370113MA3F3YKP7A','92370105MA3CP3G42G','92370104MA3FAGDX7B','92370102MA3DP37461','91370104MA3DGM0H00','91370100MA3MKYGD20','92370105MA3FDE7427','91370100MA3M8NJR0J','91370112MA3M5MB34E','92370102MA3FAADD7J','91370102MA3EHWAD54','91370100MA3EXTX71Y','91370112MA3F5QE54P','91370112MA3DPW542G','91370181MA3MYPLY8P','91370102MA3MKRLB93','91370100MA3F73NA09','91370102MA3DPYMA5R','92370102MA3EPJK350','92370181MA3F4DXX36','92370105MA3FBCKW8Q','91370113MA3FEW1F9Q','91370103MA3D8T0P11','91370103MA3ERAK4XJ','91370102MA3N2XEN1F','91370102MA3M9TDU9M','91370112MA3ENW4DXJ','91370103MA3D55YW3P','91370105MA3L82KP2H','92370112MA3DEWP079','92370104MA3D6YDG3J','92370124MA3DE4PG16','91370113MA3FDWF772','92370105MA3DLMW10Q','92370104MA3F2TGC62','92370103MA3DCA7799','92370102MA3DTB440E','92370105MA3DM6LM4P','92370103MA3DHX9G5H','92370125MA3DMUY961','91370100MA3MYC1FXK','91370105MA3MP1GG4Y','92370126MA3EJA2A0F','91370000163062177E','91370100MA3MD2QD0E','91370102MA3F4YDA5E','92370181MA3D3BK75H','92370181MA3F5WW477','92370125MA3DED7U6M','913701023072682124','92370181MA3D3W0N63','91370100MA3M24GQ9H','91370105MA3F8WQ618','91370112MA3DKXL079','91370104MA3ML3P557','92370126MA3CNWG91W','92370104MA3F9RHQXA'];
    return items[Math.floor(Math.random()*items.length)];
}
//公司名称
function randomCompanyNames(){
    var items = ['山东博达建筑工程有限公司','山东杰安建筑工程有限公司','历城区任尔秀饰品店','济南懿滨信息科技有限公司','国旭保险经纪有限公司山东分公司','济南智诚建材有限公司','山东天凯立环保设备有限公司','济南乐意电子商务有限公司','济南苏星克文化传媒有限公司','济南乐快体育发展有限公司','济南市章丘区老郭水暖安装部','历城区丙锋建材经营部','济南市历城区郭店镇锦平顺兴商店','济南槐荫米色森林米线店','济南市章丘区明水润隆珠宝店','济南槐荫大唐工艺品商行','济南彦强汽车销售有限公司','济南铉迪智能科技有限公司','济南市长清区丰酬熟食店','济南同联建筑工程有限公司第一分公司','济南拓达环保科技有限公司','济南紫云坊家政服务有限公司','济南花果山电子商务有限公司','商河县展旺花生油加工厂','山东海洋集团有限公司','济南亿顺农副产品有限公司','济南市长清区晨阳家庭农场','高新开发区舜华国兴鸡排店','济南市天桥区跃贝食品店','济南市长清区成芳零食店','济南市章丘区传辉烤肉店','济南易久经贸有限公司','济南鑫典照明电器有限公司','中移铁通有限公司济南分公司黄台南路营业厅','济阳县白鲸文具用品销售中心','山东铁投岩土工程有限公司','无字号个体工商户','济南历下天时人和科技经营部','济南极鸣文化传媒有限公司','山东维尼教育科技有限公司','山东尚博教育科技有限公司','山东尚邦建筑劳务有限公司济南一分公司','市中区西北四十五度餐厅','济南和宜好物流服务有限公司','济南市天桥区绿意纺织商行','济南槐荫飓风超市','济南历下碧云坊食品店','山东翼开播文化传媒有限公司','山东融盛商业保理有限责任公司','济南市天桥区欢颜家具经营部','济南盛邦建材有限公司','济南兰鲜生食品科技有限公司','济南历下互联时代数码产品经营中心','济南川木建材有限公司','济南声画文化传媒有限公司','济南泰彬贸易有限公司','济南云丽餐饮企业管理中心仲宫分店','济南胜泽环保设备有限公司','济南颖嘉奇珠宝有限公司','华龙证券股份有限公司山东分公司','山东一锦窗饰有限公司','济南历下秋霞小吃店','济南市章丘区明水艳民五金商店','济南市天桥区宇创办公用品商行','山东齐鲁长青汽车销售服务有限公司','济南圣达辉电动车有限公司王官庄分公司','山东耀磊电子商务有限公司','山东康禅网络科技有限公司','山东富辰建筑装饰工程有限公司','济南庚德商贸有限公司','山东安方消防工程有限公司','济南锐腾教育咨询有限公司','历城区小珍珠文化艺术交流中心','济南槐荫超牛通讯服务部','平阴县优雅家具店','济南新东栎商贸有限公司','济南市天桥区言午餐馆','济南槐荫华益综合门市部','市中区迎秀餐厅','无字号个体工商户','济南市天桥区快捷电动维修经营部','市中区鸿轩手机经营部','济阳县至诚服装加工店','山东行知研学旅游有限公司','济南良工雅居装饰工程有限公司','商河县汝珩养鸡场','山东省东方建筑安装工程总公司','山东汇圣鼎新型建材有限公司','济南弗里兹广告有限公司','无字号个体工商户','济南市章丘区明水广原蔬菜水果超市','济阳县仁风鑫禾农资门市部','山东旭篷商贸有限公司','章丘倩鑫洗化用品经营部','山东鲁明物业服务有限公司','济南康众汽车服务有限公司','济南拓蓁商贸有限公司','山东汇诚展览展示有限公司','商河县嗨呗稻小吃部','济南槐荫科宇试验仪器经营部'];
    return items[Math.floor(Math.random()*items.length)];
}
//工商注册号
function randomBusinessRegistrationNumber(){
    var items = ['370000018080581','370104200231415','370112600804490','370127200277437','370105100006928','370100200328737','370181200107056','370104200253743','370104200255525','370102200398049','370181600800336','370112600797612','370112600114781','370104600457410','370181600848201','370104600452840','370112200313054','370103200293345','370113600368821','370125300018075','370127200255497','370103200221217','370104200220832','370126600194914','370000000002246','370126200026752','370113600345330','370127600121168','370105601032121','370113600358202','370181600848365','370103200223245','370105200298901','370112100005853','370125600440998','370102200409091','370124600147801','370102600021765','370102200472446','370127200237124','370102200442796','370128300000298','370103600468151','370113200070720','370105601023277','370104600054785','370102600554054','370104200181398','370127200272922','370105601104173','370127200317817','370112200347733','370102600380228','370102200410547','370127200265415','370112200276079','370112300037034','370181200153794','370102200436329','370127100004933','370102200383209','370102600588900','370181600831108','370105601100856','370113200073610','370103300025981','370103200257989','370102200457583','370102200488063','370112200295044','370103200213855','370105200352224','370112600776501','370104600434852','370124600210964','370113200073298','370105601064685','370104600108806','370103600432819','370102600307454','370105600881423','370103600438924','370125600420905','370127200286876','370105200387564','370126600314503','370000018059825','370100200345595','370102200392253','370181600783321','370181600833494','370125600412307','370102200202208','370181600784523','370127200305024','370105200333701','370112200264405','370104200218364','370126600286926','370104600469584'];
    return items[Math.floor(Math.random()*items.length)];
}