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
     */
    ANYI.prototype.get =function(u,d,f) {
        var o = new XMLHttpRequest();
        //待处理拼接参数
        o.open('GET', u, true);
		o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        o.send(null);
        o.onreadystatechange = function () {
            if (o.readyState == 4) {
                f(o.responseText, o.status);
            }
        }
    }

    /**
     * 
     * @param {*} u url
     * @param {*} d 数据
     * @param {*} f 回调函数
     */
    ANYI.prototype.post =function(u,d,f) {
        var o = new XMLHttpRequest();
        o.open('POST', u);
		o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        o.send(JSON.stringify(d));
        o.onreadystatechange = function () {
            if (o.readyState == 4) {
                f(o.responseText,o.status);
            }
        }
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
                if(el["url"]){
                    li.innerHTML = "<a href='"+ el["url"] +"'>" + el["title"] + "</a>";//为菜单追加原始url
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
        });
    }
    /**
     * 为页面设置子页面
     * @param {*} id 子页面的divID
     */
    ANYI.prototype.setcontent = function(id) {
        ANYI.content = document.getElementById(id);//获取元素
    }
    



    $.anyi =  new ANYI();
}(window);
