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
        o.open('GET', u);
        o.send();
        o.onreadystatechange = function () {
            if (o.readyState == 4) {
                f(o.responseText,o.status);
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



    $.anyi =  new ANYI();
}(window);
