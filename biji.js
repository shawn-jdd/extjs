extjs 学习资料
1、onReady 定义在onReady内的语句块会在页面上下文加载完毕后执行
2、define 定义一个类
3、createc初始化一个类的实例
4、extjs项目中自定义extjs文件加载路径
5、maven的bundle插件配置



创建extjs的资料
http://m.blog.csdn.net/blog/tang745163962/42915347

需要处理的问题有
1、extjs采用的开放方式 extjs mvc
2、extjs加载模式


extjs 的应用程序的路口是
1、在apps.js中定义mainView的默认加载的页面
       /*extjs的主入口*/
    mainView: 'extjs6.view.main.Main'
    还有另外一种方式来实现创建默认主页
  launch: function() {
    Ext.create('TestApp.view.main.Main');
  }


2、extjs6不建议使用多页面加载，采用单个页面加载模式
3、reuires作用
   requires主要实现异步加载js文件
    requires: [
        'extjs6.view.main.Main'
    ]
    上面的代码表示异步加载extjs6.view.main.MainController控制器
4、spring mvc
Ext.application({
    name: 'FV',

    // All the paths for custom classes
    paths: {
        'Ext.ux': '../../../examples/ux/'
    },

    // Define all the controllers that should initialize at boot up of your application
    controllers: [
        'Articles',
        'Feeds'
    ],
    
    autoCreateViewport: true
});
5、extjs alias别名的作用

6、autoCreateViewport的作用
   //自动创建的Viewport的类名,文件在 app/view/main/Main.js  
   autoCreateViewport: 'app.view.main.Main'
7、extjs的类库加载模式有两种
  a、通过手工指定各个js和css
  <link rel="stylesheet" type="text/css" href="lib/theme-neptune-all.css">
  <script type="text/javascript" src="lib/ext-all.js"></script>
  <script type="text/javascript" src="lib/theme-neptune.js"></script>
  <script type="text/javascript" src="app.js"></script>
  b、通过bootstrap.js实现加载，通过这种方式无法进行多页面的加载，需要手工修改bootstrap.js中文件加载路径为绝对路径
8、routes作用
    routes: {
        'main': 'onMain'
    },
9、onButtonMain作用
    onButtonMain: function() {
        this.redirectTo('main');
    },
10、view
    一般情况下一个view对应三个文件 
    modle
    view
    controller

11、学习途径
   github
   csdn
12、classic和modern区别
  classic主要用于pc端的开发
  modern用于移动端的开发，若只是在pc端开发可以删除掉该目录
13、extjs运行的顺序
   1、index.html为引导页
   2、运行bootstrap.js文件
   3、运行app.js
   4、运行application.js
   5、执行view / contrller 程序
14、main.js与mainController.js的区别
   在app\controller目录下有Main.js和root.js两个文件，这两个文件都只有简单的定义，没有具体的执行代码。
   可以预想，在5的开发中，Main.js的主要作用是作为视图之间的数据传递之用。
   而root.js，根据注释主要作用是用来定义路由。
15、alias
    Ext.define('extjs6.view.main.MainController', {
        extend: 'Ext.app.ViewController',

        alias: 'controller.main',
    其中controller.main相当于extjs6.view.controller.Main
16、实现与后台数据交互的异步加载
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
17、extjs mvc需要以下几个文件夹
    1、controller
    2、model
       模型层
    3、store
       store一般作为数据仓库，不是extjs必须的文件夹
    4、view

1、Main.js文件如何实现
2、MainController与main区别
3、实现如何刷新已经修改的js脚本
4、alias字段作用如何
   alias : 相当于别名一样,可以起多个,可以通过xtype和Ext.widget()创建实例:
    Ext.define('SimplePanel', {  
        extend: 'Ext.panel.Panel',  
        alias: ['widget.simplepanel_007','widget.simplepanel_008'],  
            title: 'Yeah!'  
    });  
      
    //通过Ext.widget()创建实例  
    Ext.widget('simplepanel_007',{  
        width : 100,  
        height : 100  
    }).render(Ext.getBody());  
      
    //通过xtype创建  
    Ext.widget('simplepanel_007', {  
        width : 100,  
        items: [  
            {xtype: 'simplepanel_008', html: 'Foo'},  
            {xtype: 'simplepanel_008', html: 'Bar'}  
        ]  
    }).render(Ext.getBody());  

   注意：对于view类的创建，我们需要定义alias，这是为了方便我们通过xtype来创建该组件的实例。（如果没有alias，我们将很难在viewport和controller中使用 —— 这是我爬过的坑！）
5、viewport.js是做什么的
6、controller作为连接model、store和view的桥梁，在mvc开发模式中起到了至关重要的作用。如果说model定义了数据模式、store提供了数据存取的方法、view用来展示数据，那么controller将用来控制具体的数据操作。
   视图元素包括View、viewcontrollers和viewModels应该放置在一个文件夹下，方便管理
7、说明
   官方把main作为整个程序访问的主页面和主入口
   官方示例中只有MainController.js和MainModle.js文件。
   官方把view和viewController、viewModle放在同一个文件夹下方便管理
   在官方示例中没有view这个文件(文件名为main.js)，官方示例中只有viewController(MainController.js)和viewModle文件(MainModle.js)
8、类的命名方式
    每一个类的第一行代码是各种地址，地址（adress）叫做命名空间，命名空间的格式如下：
    <AppName>.<foldername>.<ClassAndFileName>  
9、app.js和Application.js关系
    当我们生成的应用程序之前,我们创建了一个类(Application.js)和推出了它的一个实例(在app.js)。你可以看到app.js的内容如下:
10、 视图只不过是一个组件,它是Ext.Component的一个子类。一个视图包含所有应用程序的视觉方面。
11、mainView作用，
    mainView: 'extjs6.view.main.Main'
12、viewport作用
    VeiwPort 代表整个浏览器显示区域，该对象渲染到页面的body 区域，并会随着浏览器显示区域的大小自动改变，一个页面中只能有一个ViewPort 实例。Viewport 不需要再指定renderTo，而我们也看到Viewport 确实填充了整个浏览器显示区域，并会随着浏览器显示区域大小的改变而改改。Viewport 主要用于应用程序的主界面，可以通过使用不同的布局来搭建出不同风格的应用程序主界面。在Viewport 上常用的布局有fit、border 等，当然在需要的时候其它布局也会常用。

13、classic路径配置
14、为什么首先加载的是classsicapp/main/view/main.js后才会加载app/main/view/main.js
15、修改extjs的js文件无法立即生效

/*定义一个Square类*/
Ext.define('Square', {
    side: 0,
    getArea: function() {
         return this.side * this.side;
    }
});
/*创建Square类实例*/
var sq = Ext.create('Square');
/*定义类属性side*/
sq.side = 4;
/*调用Square的类方法*/
Ext.Msg.alert('Message', 'The area is: ' + sq.getArea());

以上方法并不是最好的方式，下面更好的方式
Ext.define('Square', {
     side: 0,
     constructor: function (side) {
         if (side) {
             this.side = side;
         }
     },
     getArea: function () {
         return this.side * this.side;
     }
 });
 var sq = Ext.create('Square', 4);
 Ext.Msg.alert('Message', 'The area is: ' + sq.getArea());

Ext.Msg.alert 消息提示框


extjs的类继承关系
 Ext.define('Shape', {
     color: 'gray',
     border: true,
     shapeName: 'shape',

     constructor: function (config) {
         Ext.apply(this, config);
     },

     getShapeName: function () {
         return this.shapeName;
     }
 });

 Ext.define('Square', {
     extend: 'Shape',
     side: 0,
     color: 'red',
     shapeName: 'square',

     getArea: function() {
         return this.side * this.side;
     }
 });

 function generateTestSentence(shape) {
     return ['The area of the', shape.color, shape.getShapeName(), 
             (shape.border ? 'with a border' : ''), 
             'is:', shape.getArea()].join(' ');
 }

 var square = Ext.create('Square', {
     side: 4
 });
 Ext.Msg.alert('Message', 
      [ generateTestSentence(square) ].join('<br />'));


mvvm模式
app里是不放视图相关的
一个命名空间加载两套东西
如果存放在同一个命名空间加载同一套代码中则使用的是mvc模式，
如果一个命名空间加载两套代码则使用的是mvvm模式

   Ext js应用程序统一为每一个app提供了统一相同的目录结构。我们推荐的是，所有的类都放在app文件夹下，这个文件夹包含子文件夹，里面防止你的Models 和stores还有view元素。视图元素包括View、viewcontrollers和viewModels应该放置在一个文件夹下，这样方便管理，可以参考下面的view下的main文件夹。

什么是mvvm
mvvm简单说来就是在MVC的基础上，新增了一个类似数据仓库的概念。就是说我有了数据模型(model)，也有了视图展现(view)，还有对其分发处理的控制器(controller)之后，多了一个储蓄所，如下图：

/**Ext与后端交互的操作***/


通过localhost/monitor 或者localhost:1841方式访问


参考资料 
http://blog.csdn.net/jfok/article/details/35794269
http://blog.csdn.net/tianxiaode/article/details/46744591
http://www.qeefee.com/article/extjs-mvc-in-detail
http://blog.csdn.net/sushengmiyan/article/details/38537431
http://www.itxxz.com/a/gaoji/2015/0105/ExtJS_mvvm.html
http://docs.sencha.com/extjs/5.0/whats_new/whats_new500.html

模块导航设计
http://blog.csdn.net/jfok/article/details/36627985

官方示例
http://dev.sencha.com/ext/5.0.0/examples/ticket-app/index.html
5.1的官方资料
http://dev.sencha.com/ext/5.1.0/examples/kitchensink/#all
http://dox.codaxy.com/ext5-themes/Getting-Started

6.0.1示例
http://examples.sencha.com/extjs/6.0.1/examples/kitchensink/#array-grid

4.0的中文api
http://extjs-doc-cn.github.io/ext4api/

参考资料
http://blog.csdn.net/sushengmiyan/article/category/2435029/3


Extjs的Router路由

var Ext = Ext || {};
Ext.REMOTING_API = {
    "id": "provider1",
    "url": "ext/direct/router",
    "type": "remoting",
    "actions": {
        "Album": [{
            "name": "getAll",
            "len": 0
        }, {
            "name": "add",
            "params": ["name", "artist"],
            "strict": false
        }, {
            "name": "delete",
            "len": 1
        }]
    }
};

var Ext = Ext || {};
Ext.REMOTING_API = {
    "id": "provider1",
    "type": "remoting",
    "url": "ext/direct/router",
    "actions": {
        "User": [{
            "name": "read",
            "len": 1
        }, {
            "name": "create",
            "params": ["id", "username"]
        }]
    }
};
Ext.POLLING_API = {
    "id": "provider2",
    "type": "polling",
    "url": "ext/direct/events"
};


extjs 的图形表格类库没有包含在extjs 类库中，需要手工加载
// in Ext JS 5.x
<script type="text/javascript" src="{SDKLocation}/build/packages/sencha-charts/build/sencha-charts.js"></script>
<link type="text/css" href="{SDKLocation}/build/packages/sencha-charts/build/{themeName}/resources/sencha-charts-all.css">

// in Ext JS 6.x
<script type="text/javascript" src="{SDKLocation}/build/packages/charts/{toolkitName}/charts.js"></script>
<link type="text/css" href="{SDKLocation}/build/packages/charts/{toolkitName}/{themeName}/resources/charts-all.css">



pujinet_007
ps007#007


构建的时候出现的错误
TypeError: Ext.define is not a function
解决方案
1、重启浏览器，有可能是浏览器缓存作怪
2、有可能的原因
这是因为存在代码编译不通过，使用sencha app watch 查看不出错误，使用sencha app refresh可以看到错误提示

js文件目录/文件名、引用类包名、定义类包名要保持一直否则会导致提示错误

Ext.getStore('userStore');只能读取全局的数据

http://www.atguigu.com/download.shtml#springdata

错误:
     [E] Ext.data.schema.Schema.lookupEntity(): No such Entity "monitor.model.user.UserModel".
     http://192.168.9.170:8080/monitor/ext/build/ext-all-rtl-debug.js?_dc=1448266750226
     Line 8735
    model的定义内容与sotre对应不上
    
extjs5中的route和redirectTo执行机制介绍
http://extjs.org.cn/node/706

model可以包含数据，不需要store


前端开发利器
submile webstorm


布局树形
layout: {  
        type: 'vbox',  
        pack: 'start',              //纵向对齐方式 start：从顶部；center：从中部；end：从底部  
        align: 'stretchmax'             //对齐方式 center、left、right：居中、左对齐、右对齐；stretch：延伸；stretchmax：以最大的元素为标准延伸  

extjs更换主题
http://blog.csdn.net/sushengmiyan/article/details/42016107

问题列表：
问题一：以下三个的区别
ext.container.Container
ext.tab.Panel
ext.panel.Panel
问题二：更换主题
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
问题三：如何引用自定义的css文件和调用css
问题四：如何引用自定义的csss的样式类
问题五：如何定义背景图
问题六：如何更换extJs主题
问题七：如何给平台名称添加连接

两种相同方式定义viewModel
1、
viewModel : {  
        type : 'main'  
        // MVVM架构的viewModel的类型，会在当前路径中根据‘Main’ + Model 来确定文件名  
    },  
2、viewModel: 'main',
  

extjs的三种类加载机制
//requires加载需要的类时机是  当前类初始化之前被加载
requires:[
    "Ext.window.Window",
    "Ext.button.Button"
],
//uses 加载需要的类时机是,当前类初始化之后被加载
uses:[
    "Ext.form.Panel",
    "Ext.grid.Panel"
],
//当前类初始化时,该实例是一个单例对象
singleton:true


很好的图标按钮网站
http://www.bootcss.com/p/font-awesome/#icons-new
http://fortawesome.github.io/Font-Awesome/


/*设置图标字体文件，只有设置了以后才能用glyph属性  */
initComponent : function() {
    Ext.setGlyphFontFamily('FontAwesome'); 
    this.callParent();  
},  

http://extjs.org.cn/node/703


出现错误：
com.sencha.exceptions.ExNotFound: Unknown definition for dependency : Ext.button.Button
原因：路径错误，集成类的文件存放位置错误，需要将他放在classic/src/ui下面，而不是在app/ui/下面


[Ext.createByAlias] Unrecognized alias: plugin.tabclosemenu
throw new Error("[Ext.createByAlias] Unrecognized alias: " + alias);



viewport 填满整个屏幕，可以用来显示正在加载
/*********************全局视图容器类************************/  
Ext.define("OA.view.Viewport",{  
    extend:'Ext.container.Viewport',  
    requires:['Ext.container.Viewport','OA.view.MainPanel'],  
    alias : 'widget.baseviewport',  
    alternateClassName: ["OA.Viewport"],  
    layout: 'fit',  
    loadMask:{msg : '正在加载，请稍候...'},  
    items: [  
        {  
            xtype: 'mainpanel'  
        }  
    ]  
});  

警告提示
解决方法：
Synchronously loading 'Ext.ux.TabReorderer'; consider adding Ext.require('Ext.ux.TabReorderer') above Ext.onReady


app.json中添加要编译的文件的方法
{
    "path": "${toolkit.name}/src/ux/Renderer.js"
}

错误
[ERR] com.sencha.exceptions.ExBuild: Failed to find any files for F:\SvnCodeManage\renrentong\monitor\src\main\webapp\app\view\main\MainController.js::ClassRequire::Ext.window.Toast
[ERR]


通过Ext.Loader.setPath('Ext.ux', 'ext/packages/ux');来指定ux的路径实现加载
'Ext.MessageBox', 'Ext.window.Toast',

extjs Requirement had no matching files Ext.window.Toast
原因


extjs 桌面系统
http://blog.csdn.net/sjf0115/article/details/9346727
http://examples.sencha.com/extjs/6.0.1/examples/classic/desktop/index.html


Ext.window.Toast调用方法
Ext.toast('Data saved');
Ext.toast('Data Saved', 'Title', 't')
 *      Ext.toast({
 *          html: 'Data Saved',
 *          title: 'My Title',
 *          width: 200,
 *          align: 't'
 *      });
 *

 'Ext.window.Toast'


写法为store: 'companies',读取到store为null，解决方法
写法改成
    store: {
        type: 'companies'
    }




ext-all-rtl-debug.js 与ext-all-debug.js区别是前者带有编译注释，后者没有

--------------------------------
[E] According to WAI-ARIA 1.0 Authoring guide (http://www.w3.org/TR/wai-aria-practices/#menubutton), menu button 'splitbutton-1138' should display the menu on SPACE and ENTER keys, which will conflict with the button handler.
http://192.168.9.170:8080/monitor/ext/build/ext-all-rtl-debug.js?_dc=1449036246124
Line 8735
错误原因：
listeners : {
    /*这里不要用handler，而要用click,因为下面要发送click事件*/
    handler : 'addRecord',
    /*删除按钮在渲染后加入可以Drop的功能*/
    render : function(button) {
    ｝
｝


查看项目配置信息
 sencha diag show 


 extjs的数据绑定的两种方式
1、{!isAdmin.checked}可以使有负的标志，即 反，非得概念。
    Ext.create('Ext.panel.Panel', {  
        title: 'Sign Up Form',  
      
        viewModel: {  
            type: 'test'  
        },  
      
        items: [{  
            xtype: 'checkbox',  
            boxLabel: 'Is Admin',  
            reference: 'isAdmin'  
        },{  
            xtype: 'textfield',  
            fieldLabel: 'Admin Key',  
            bind: {  
                disabled: '{!isAdmin.checked}'  
            }  
        }]  
    });  
2、
{firstName}:这是直接从视图模型传过来的，没有被修改，可以是任何类型。
Hello{name}:可以插入字符

    Ext.define('TestViewModel', {  
        extend: 'Ext.app.ViewModel',  
      
        alias: 'viewmodel.test', // connects to viewModel/type below  
      
        data: {  
            firstName: 'John',  
            lastName: 'Doe'  
        },  
      
        /*extjs 允许对数据进行格式化处理，在返回*/
        formulas: {  
            // We'll explain formulas in more detail soon.  
            name: function (get) {  
                var fn = get('firstName'), ln = get('lastName');  
                return (fn && ln) ? (fn + ' ' + ln) : (fn || ln || '');  
            }  
        }  
    });  
      
    Ext.define('TestView', {  
        extend: 'Ext.panel.Panel',  
        layout: 'form',  
      
        // Always use this form when defining a view class. This  
        // allows the creator of the component to pass data without  
        // erasing the ViewModel type that we want.  
        viewModel: {  
            type: 'test'  // references alias "viewmodel.test"  
        },  
      
        bind: {  
            title: 'Hello {name}'  
        },  
      
        defaultType: 'textfield',  
        items: [{  
            fieldLabel: 'First Name',  
            bind: '{firstName}'  
        },{  
            fieldLabel: 'Last Name',  
            bind: '{lastName}'  
        },{  
            xtype: 'button',  
            text: 'Submit',  
            bind: {  
                hidden: '{!name}'  
            }  
        }]  
    });  
      
    Ext.onReady(function () {  
        Ext.create('TestView', {  
            renderTo: Ext.getBody(),  
            width: 400  
        });  
    });  
多绑定
    Ext.create('Ext.Component', {  
        bind: {  
            data: {  
                fname: '{firstName}',  
                lname: '{lastName}'  
            }  
        }  
    });  
找到指定记录绑定
    Ext.create('Ext.Component', {  
        bind: {  
            data: {  
                reference: 'User',  
                id: 42  
            }  
        }  
    });  
关联绑定
    Ext.create('Ext.Component', {  
        bind: {  
            data: {  
                reference: 'User',  
                id: 42,  
                association: 'address'  
            }  
        }  
    });  
只绑定一次就销毁
    Ext.create('Ext.Component', {  
        bind: {  
            data: {  
                bindTo: '{name}',  
                single: true  
            }  
        }  
    });  

  使用deep操作来绑定引用操作的更新 
      Ext.create('Ext.Component', {  
        bind: {  
            data: {  
                bindTo: '{someObject}',  
                deep: true  
            }  
        }  
    });  

数组遍历
Ext.each=Ext.Array.each(array, functioon(item, index, allItems){
     if(index < 0){
         /*退出循环*/
         return false;
     }
})

shiro与jFinal应用到extjs中
需要整合shiro到项目中
后台使用JFinal，前台使用extjs6
JFinal那么在controller中就可以截获loaddata方法。在loaddata中进行后台数据获取和组装，并传入前台就可以实现前后台互动了。

官方的登录示例
http://docs.sencha.com/extjs/5.0/getting_started/login_app.html


1、sencha eclipse插件安装
    插件安装教程
    http://extjs.org.cn/node/618
    http://blog.csdn.net/sushengmiyan/article/details/40507383

    VJET下载地址
    https://www.ebayopensource.org/index.php/VJET/Downloads


2、使用sencha eclipse创建extjs项目
3、sencha 打包项目
4、更换extjs的皮肤
   http://blog.csdn.net/sushengmiyan/article/details/42016107
5、extjs的classic和touch中代码划分
  那些具有独特功能的东西将会被分解为两个绝然不同的两个工具包：古典（Classic）和现代（Modern）。这些工具包通过ExtJS和Touch的视图层来进行划分的。那些共享核心资源和逻辑，并使用这两种工具包的应用程序被称为通用（Universal）应用程序。
  “toolkit”: “classic”, // or “modern”
6、禁用缓存
   缓存可以在app.json中禁用
        */
     "loader": {
         "cache": false,
         "cacheParam": "_dc"
     },
7、ext第三方插件mpivot grid
   example
   http://www.mzsolutions.eu/mzPivotGrid.html
   doc
   http://www.mzsolutions.eu/docs/
8、extjs通过前端excel导出grid的第三方插件
   https://github.com/iwiznia/Ext.ux.Exporter
9、extjs查询组件api


    查询xtype组件

    prevField = myField.previousNode('textfield');

    这表示查询所有 textfield 以及继承自TextField的组件都会被查询。

    prevTextField = myField.previousNode('textfield(true)');

    这表示只查询TextField类的，其他继承类不用去查询，只需要传入true表示严格查询即可。

    ID或者ItemID查找

    #myContainer
    当需要查询ID定义的组件的时候，可以使用#来查询。

    xtype和ID或者ItemID组合使用

     panel#myPanel
    这样可以尽可能的减少ID带来的冲突，对xtype进行了一次过滤。

    组件树查询

    看下面一个查询实例：

    window[title="Input form"] textfield[name=login] ^ form > button[action=submit]

    语句从左到右执行，执行完成一个，就按照当前找到的那个再接着往下执行。所以这句话的意思是：
    找到标题为Iput form的window的叫做login的textfield的父窗体中button的提交名称为submit的那个按钮。
10、extjs结合poi开源代码库后端导出excel
11、store调用方法
    stores: {
        personnel: {
            type: 'personnel'
        }
    }

出现错误的原因是不能在controller里面包含Ext.window.Toast
如果在mainController中requires['Ext.window.Toast']会提示无法匹配到文件


gyxx
110666


data uri应用，在html5中建议使用data uri,虽然页面增大，如果使用gzip增大不多，但是降少了连接请求
data:[][;charset=][;base64],
