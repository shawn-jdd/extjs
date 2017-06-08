
Ext.onReady(function(){
	
/**
我们可以结合知识点去查api
ExtJs--05--给window组件添加功能条以及子组件获取上级或下级组件的属性和方法
1--
给容器组件添加控制条 及 控制项
控制条 不同的方向有多种  tbar   lbar  rbar  bbar  fbar   
2--
根据组件本身拿到上级组件的属性及方法调用
 */
/**
btn.up("window").hide();  //第一种获得上级组件  当然up是向上查找,  down是向下查找
						alert(btn.up("window").title);
Ext.Msg.alert("no2","2 info ");
Ext.getCmp("id001").hide();   //第二种获得上级组件
//ownerCt：得到当前对象所在的容器组件。 
						btn.ownerCt.ownerCt.hide();   //第三种获得上级组件
//						btn.up().up().hide();  //第四种获得上级组件

**/
	var win = new Ext.window.Window({
				id:"id001",//自定义编号
				title:"自定义标题信息",//标题
				width:400,//宽度  可以使用百分比 自适应浏览器大小
				height:400,//高度
				top:0,
				left:0,
				layout:"vbox",
				renderTo:Ext.getBody(),
				// tbar   lbar  rbar  bbar  fbar
				tbar:[{
					text:"第一个按钮",
					handler:function(btn){
//						Ext.Msg.alert("no1","1 info ");
//						btn.up("window").hide();  //第一种获得上级组件  当然up是向上查找,  down是向下查找
						alert(btn.up("window").title);
					}
				},{
					text:"第二个按钮",
					handler:function(btn){
//						Ext.Msg.alert("no2","2 info ");
						Ext.getCmp("id001").hide();   //第二种获得上级组件
					}
				},{
					text:"第三个按钮",
					handler:function(btn){
//						Ext.Msg.alert("no3","3 info ");
						//ownerCt：得到当前对象所在的容器组件。 
						btn.ownerCt.ownerCt.hide();   //第三种获得上级组件
//						btn.up().up().hide();  //第四种获得上级组件
					}
				}]
		
	});
	
	win.show();
	
})
