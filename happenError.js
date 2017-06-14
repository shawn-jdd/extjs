1,在首页添加一个按钮点击显示页面
在 a.show()的时候报错： Layout run failed
网上也发生过的错误下面是网上代码
******************************************
当GridPanel被添加到容器，且容器的layout为vbox时候， 会出现 Layout run failed 后者GridPanel的尺寸没有撑满父容器
网上找到的解决办法是，要给父容器设置一个高度，但问题是，高度没有办法定死。切写死后，也没有解决此问题。

此时修改父容器的layout为
 layout: {
        type: ‘vbox‘,
        align: ‘stretch‘
    },
然后GridPanel设置flex:1 可以解决此问题

更多交流就在Q群 107584987
Coding Your Life
******************************************
我的代码
{
					xtype : 'button',
					tooltip : '排班',
					text:'排班',
					handler : function(button, e) {
						var Scheduling = Ext.create(Sgai.view.md.mdPbManager.MdPbManagerView,{reference:'HeadMdPbManagerView',floating :true})
						Scheduling.show();
					}
				}
我自己的是写在dockedItems里面所以我计划吧这个creat从dockedItems 里面拿出来
