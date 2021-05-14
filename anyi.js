/*
 @Name ANYI
 @Description UI框架 安逸 E-mail: yxhuawei@qq.com
 @github https://github.com/anyisoft-huawei
 @License MIT 
 */
void function($) {

    /** 源文档 */
    var doc = $.document,
    /** 配置信息 */
    config = {
        paths : {}
    },
    /** 引用 */
    ANYI = function() {
        /** 版本号 */
        this.v = "1.0.1beat";
    };
    
    /**
     * 
     * @param {*} o 对象
     * @param {*} e html元素
     * @param {*} n 属性名
     */
    var bing = function(o,e,n){
        Object.defineProperty(o,n,{ 
            get:function(){return e[n];}, 
            set:function(v){
                e[n]=v;
            } 
        });
    };
    
    /**
     * 绑定对象到ui
     * @param {*} id ui的id
     * @param {*} o 要绑定的对象
     * @param {*} b 是否将默认值赋值到ui
     */
    ANYI.prototype.bings = function(id,o,b){
        for (const key in o) {
            if (Object.hasOwnProperty.call(o, key)) {
                let e = doc.getElementById(id);
                if(e){
                    if('on' == key.substr(0,2)){
                        e[key]=  o[key];
                    }else{
                        if(b) e[key]=  o[key];
                        bing(o,e,key);
                    }
                }
            }
        }//for
    }

    /**
     * 
     * @param {*} u url
     * @param {*} d 数据
     * @param {*} f 回调函数
     * @param {*} w 是否跨域访问
     */
    ANYI.prototype.get =function(u,d,f,w) {
        var o = new XMLHttpRequest();
        o.onload = function(){ 
            f(this.responseText, this.status);//回调
        };
        if(w)o.withCredentials = true;//设置跨域访问
        //待处理拼接参数
        o.open('GET', u);
		o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        o.send(null);
    }

    /**
     * 
     * @param {*} u url
     * @param {*} d 数据
     * @param {*} f 回调函数
     */
    ANYI.prototype.post =function(u,d,f) {
        var o = new XMLHttpRequest();
        o.onload = function () {
            f(this.responseText, this.status);
        }
        o.open('POST', u);
		o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //o.setRequestHeader("Access-Control-Allow-Origin", "*");
        o.send(JSON.stringify(d));
    }

    /**
     * 
     * @param {*} u url
     * @param {*} d 数据
     * @param {*} f 回调函数
     */
     ANYI.prototype.postform =function(u,d,f) {
        var o = new XMLHttpRequest();
        o.onload = function () {
            f(this.responseText, this.status);
        }
        o.open('POST', u);
		o.setRequestHeader("Content-Type", "multipart/form-data");
        var form= new FormData(); 
        for (const key in d) {
            if (Object.hasOwnProperty.call(d, key)) {
                form.append(key, d[key]);
            }
        }
        o.send(form);
    }


    /**
     * 写入cookie
     * @param {*} n 名称
     * @param {*} v 值
     * @param {*} t 时效
     * @param {*} p 路径
     * @param {*} d 作用域
     * @param {*} s 安全
     */
    ANYI.prototype.setCookie=function(n, v, t, p, d, s) { 
        var ck = n + "=" + encodeURIComponent(v); 
        if (t) { 
            var d = new Date();
            d.setHours(d.getHours() + t);
            ck += "; expires=" + d.toGMTString(); 
        } 
        if (p) ck += "; path=" + p; 
        if (d) ck += "; domain=" + d; 
        if (s) ck += "; secure" + s; 
        doc.cookie = ck;
     } 
    
    /**
     * 获取cookie
     * @param {string} n 名称
     * @returns 
     */
    ANYI.prototype.getCookie=function(n){
        var reg = eval("/(?:^|;\\s*)" + n + "=([^=]+)(?:;|$)/");
        return  decodeURIComponent(reg.test(doc.cookie) ? RegExp.$1 : "");
    }


    /** 提供对菜单的初始化和添加 */
    ANYI.prototype.menus={};
    
    /**
     * 向集合中添加菜单元素(待增加递归处理)
     * @param {*} id 菜单的id
     * @param {*} o 菜单参数
     */
    ANYI.prototype.addmenu= function (id,o) {
        var m = document.getElementById(id);//获取元素
        var title = document.createElement("span");
        title.innerHTML = o["title"];
        m.appendChild(title);//设置菜单标题
        m.setAttribute("anyi-expand", "true");//设置默认为展开
        //为菜单关联展开函数
        m.onclick=function(e){
            e.target.setAttribute("anyi-expand",e.target.getAttribute("anyi-expand")=="false"?"true":"false");
        };
        //循环添加元素
        if(o["items"]){
            var ul = document.createElement("ul");
            m.appendChild(ul);
            for (let index = 0; index < o["items"].length; index++) {
                const el = o["items"][index];
                var li = document.createElement("li");
                ul.appendChild(li);
                if(el["href"]){
                    li.innerHTML = "<a href='"+ el["href"] +"'>" + el["title"] + "</a>";//为菜单追加原始url
                }else {
                    li.innerText = el["title"];
                    if(el["anyiurl"]){
                        li.setAttribute("anyi-url", el["anyiurl"]);
                        li.onclick=function(e) {
                            clickurl(e.target.getAttribute("anyi-url"));//子页面的url处理事件
                        }
                    };
                };
                if(el["onclick"])  li.onclick=el["onclick"];//如果有自定义事件则覆盖
            }
        }
        //ANYI.menus[id]=o;//存储配置
    }

    /**
     * 对菜单进行初始化(待增加递归处理)
     * @param {*} id 菜单id
     */
    ANYI.prototype.intimenu=function(id) {
        var m = document.getElementById(id);//获取元素
        for (let index = 0; index < m.childNodes.length; index++) {
            const el = m.childNodes[index];
            
        }
    }



    /** html页面中的子页面 */
    ANYI.prototype.content;
    /**
     * 在子页面中打开链接
     * @param {*} url 要打开的url
     */
    var clickurl = function(url) {
        ANYI.prototype.get(url, null, function(d) {
            ANYI.prototype.content.innerHTML = d;//待调试
        },true);
    }
    /**
     * 为页面设置子页面
     * @param {*} id 子页面的divID
     */
    ANYI.prototype.setcontent = function(id) {
        ANYI.content = document.getElementById(id);//获取元素
    }
    



  /**
         * 创建轮播
         * @param {*} imgs 图片组
         * @param {*} bs 按钮组
         * @param {*} w 宽度
         * @param {*} h 高度
         * @param {*} t 高度
         */
   var lunbo = function(imgs,w,h,t,time) {
        var that = this;
        this.imgs = imgs;
        this.bs = [];
        //var lb ={index:0}
        /** 当前图片的索引 */
        this.index = 0;
        var sc = "transform: translate(" + w + "px,0);z-index: 99;transition: none; ";//定位模板
        var dc = "transform: translate(-" + w + "px,0);z-index: 99;transition:all 1s ease ;"//移动模板
        //移动类型
        switch (t) {
            case 1://右向左
                sc = "transform: translate(-" + w + "px,0);z-index: 99;transition: none; ";
                dc = "transform: translate(" + w + "px,0);z-index: 99;transition:all 1s ease ;"
                break;
            case 2://上向下
                sc = "transform: translate(0,-" + h + "px);z-index: 99;transition: none; ";
                dc = "transform: translate(0," + h + "px);z-index: 99;transition:all 1s ease ;"
                break;
            case 3://下向上
                sc = "transform: translate(0," + h + "px);z-index: 99;transition: none; ";
                dc = "transform: translate(0,-" + h + "px);z-index: 99;transition:all 1s ease ;"
                break;
            default:
                break;
        }
        /**
         * 变换图片位置
         * @param {*} i 当前图片
         * @param {*} ni 下一个图片
         */
        var tf=function(i,ni){
            imgs[i].setAttribute("style","z-index: 99; ")//降低当前层索引
            imgs[i].setAttribute("style", dc)//移动当前
            imgs[ni].setAttribute("style","transform: translate(0px,0px);z-index: 100;transition:all 1s ease ;")//移动
            if(i < that.bs.length){//为按钮组设置状态
                that.bs[i].removeAttribute("anyi-selected");//重置当前状态
                that.bs[ni].setAttribute("anyi-selected","");//设置下个按钮状态
            }
            ni++;
            if(ni >= imgs.length)ni=0;
            imgs[ni].setAttribute("style", sc)//将下一次的图片移到准备区
        }
        /** 下一张图片 */
        this.next=function(){
            if(that.index >= imgs.length) that.index=0;
            nexti = that.index + 1;//下一张图片索引
            if(nexti >= imgs.length)nexti=0;
            tf(that.index,nexti);
            that.index++;
        };

        /**
         * 设置某个图片显示最前
         * @param {*} ii 最前的图片位置
         */
         this.setimg=function(ii){
            for (let i = 0; i < imgs.length; i++) {
                if(ii == i)imgs[i].setAttribute("style","z-index: 200;");//指定图片显示在最前
                else {
                    //根据方向初始化其它图片位置
                    switch (t) {
                        case 1://右到左
                            imgs[i].setAttribute("style", "transform: translate(-" + w + "px,0);z-index: 99;transition: none; ");
                            break;
                        case 2://上到下
                            imgs[i].setAttribute("style", "transform: translate(0,-" + h + "px);z-index: 99;transition: none; ");
                            break;
                        case 3://下到上
                            imgs[i].setAttribute("style", "transform: translate(0," + h + "px);z-index: 99;transition: none; ");   
                            break;
                        default://左到右
                            imgs[i].setAttribute("style", "transform: translate(" + w + "px,0);z-index: 99;transition: none; ");
                            break;
                    }
                }
                if(i < that.bs.length){//如果有按钮组
                    if(ii == i) that.bs[i].setAttribute("anyi-selected","true");
                    else that.bs[i].setAttribute("anyi-selected","");
                }
            };
            that.index = ii;
        };
        
        this.setimg(0);//初始化图片位置
        this.id = $.setInterval(this.next, time);//开始工作
    }

    /** 轮播管理 */
    ANYI.prototype.lunbos={};
    /**
         * 初始化轮播
         * @param {*} id 要初始化的id
         * @param {*} o 轮播的配置
         */
     ANYI.prototype.initlunbos=function(id, o) {
        var m = document.getElementById(id);//获取元素
        var imgs=[];
        //遍历图片添加到组
        for (let index = 0; index < m.children.length; index++) {
            imgs.push(m.children[index]);//将成员存入数组
        };
        var lb = new lunbo(imgs, o["w"], o["h"], o["fx"],o["time"]);//新的轮播对象
        ANYI.prototype.lunbos[id]=lb;
      
        //如果有左右切换按钮
        if(o.hasOwnProperty("lb")){            
            let fg = o["lb"] ? o["lb"] : "anyi-btn-t anyi-lunbo-left";//空设为默认风格
            var btn = document.createElement("button");
            btn.setAttribute("class", fg);
            btn.setAttribute("style","z-index: 200;");
            btn.innerText = "<<";//待修改
            btn.onclick =  function(){
                nexti = lb.index- 1;
                if(nexti < 0) nexti=lb.imgs.length - 1;
                lb.setimg(nexti);
            };//关联动作
            m.appendChild(btn);
        }
        //如果有左右切换按钮
        if(o.hasOwnProperty("rb")){            
            let fg = o["rb"] ? o["rb"] : "anyi-btn-t anyi-lunbo-right";//空设为默认风格
            var btn = document.createElement("button");
            btn.setAttribute("class", fg);
            btn.setAttribute("style","z-index: 200;");
            btn.innerText = ">>";//待修改
            btn.onclick = lb.next;//关联动作
            m.appendChild(btn);
        }
        //如果有按钮组
        if(o.hasOwnProperty("bs")){
            var bsdiv = document.createElement("div");
            bsdiv.setAttribute("class","anyi-lunbo-sbox");
            bsdiv.setAttribute("style","z-index: 200;");
            m.appendChild(bsdiv);
            let fg = o["bs"] ? o["bs"] : "anyi-lunbo-sitem";//空设为默认风格
            for (let index = 0; index < imgs.length; index++) {
                const btn = document.createElement("button");
                btn.setAttribute("class", fg);
                btn.setAttribute("anyi-index", index);
                btn.onclick = function(e){
                    lb.setimg(e.target.getAttribute("anyi-index"));
                };//关联动作
                bsdiv.appendChild(btn);
                lb.bs.push(btn);
            }
        }

    };

    /**
         * 添加轮播
         * @param {*} id 要添加到id
         * @param {*} o 要添加的轮播内容
         */
    ANYI.prototype.addlunbos=function(id, o) {
            

    };
    
    /**
     * 移除轮播
     * @param {*} id 要移除的轮播id
     */
    ANYI.prototype.removelunbos=function(id) {
        
    };


    $.anyi =  new ANYI();
}(window);
