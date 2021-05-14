# anyi
前端UI  
License MIT  

## 引入
~~~
<link href='../anyi/css/anyi.css' rel='stylesheet'>
<script type="text/javascript" src="../anyi/anyi.js"></script>   
~~~

## 轮播的使用
这里用一段html示例使用
~~~
   <!-- 轮播 -->
   <div id="lunbo" class="anyi-lunbo" style=" height: 50px;width: 200px;background-color: #a0a09cde;" >
        <img src="img/001.jpg" >
        <img src="img/002.jpg" >
        <img src="img/003.jpg" >
        <img src="img/004.jpg" >
        <img src="img/005.jpg" >
        <div>
            <span>轮播容器下的每个div标签也可以参与轮播</span>
        </div>               
   </div>
~~~
用脚本初始化轮播
~~~
 anyi.initlunbos("lunbo",{ w:200, h:50, fx:0, time:3000, lb:"", rb:"",  bs:""});
~~~
 w:轮播容器宽度  
 h:轮播容器高度  
 fx:轮播移动的方向(0左右1右左2上下3下上)  
 lb,rb:左右按钮风格类名，值为""则默认，不使用则不添加按钮  
 bs:按钮组风格类名，值为""则默认，不使用则不添加按钮组  
 time:间隔时间(毫秒)


## 菜单的使用
### 为已有菜单添加展开点击
~~~
            <div id="menus"  style="text-align: center;display: inline;">
                <div class="anyi-menu" anyi-unexpand>
                    <span>仓储管理</label> 
                    <ul>
                        <li>库存管理</li>
                        <li>库存预警</li>
                        <li>报表管理</li>
                    </ul>
                </div>
                <div class="anyi-menu-line"></div>
                <div class="anyi-menu">
                    <span>管理中心</label> 
                    <ul>
                        <li>个人中心</li>
                        <li>消息中心</li>
                        <li>修改密码</li>
                        <li>
                            <div class="anyi-menu">
                                <span>基本设置</label> 
                                <ul>
                                    <li>个人中心</li>
                                    <li>修改密码</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="anyi-menu-line"></div>
            </div>
~~~
菜单采用div下嵌套ul调用 anyi.intimenu("menus");检查为类名含anyi-menu的项添加展开点击事件

### 代码中添加菜单
~~~
<div id="menus"  style="text-align: center;display: inline;"></div>
~~~
脚本里调用
~~~
            anyi.addmenu("menus",{
                "title":"新增",
                "items":[
                    { id:"m001", title:"菜单项1", href:"http://www.baidu.com" },
                    { id:"m003", title:"菜单项3", onclick:function(e){ }  },
                    { id:"m004", items:{
                            "title":"新增2",
                            "items":[ { id:"m001", title:"菜单项5", href:"http://www.baidu.com" }]
                        }
                    
                    }
                ]
            }); 
~~~
可以为菜单添加菜单集合并定义url或者点击事件
