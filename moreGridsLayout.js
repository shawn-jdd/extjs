公司业务要求一个页面显示三个grid，弄出来感觉好挤，没有好的布局方案，所以就开始考虑从前端角度去优化页面，最大化的方便用户操作和展示友好所以我想出两种方案
1,rowexpander  针对那个加号点击显示一个grid,下面展示一个grid,就是一个页面缩减成两个grid,
2,利用动画鼠标放到哪个grid里，grid自动变大，剩下两个变小。
上代码，在listeners里面监听afterrender,添加事件expandBody，collapsebody，当展开的时候添加grid,隐藏的时候销毁。（不销毁的话可能会出现id重复的错误）
第一种rowexpander:
Ext.define('Sgai.view.ip.ipEnterprise.IpEpListGrid',{
		extend:'Ext.grid.Panel',
		alias:'widget.ipEpListGrid',
		layout:'fit',
		reference:'ipEpListGrid',
	    region:'center',
	    autoScroll:true,
	    columnLines:true,
//	    border:0,
//	    collapsible:true,
//	    title: translations.dataList,
//	    iconCls:'data',
	    store:Ext.create('Sgai.store.ip.ipEnterprise.IpEnterpriseStore',{storeId:'ipEnterpriseStore'}),
	    initComponent: function () {
	        var me = this;
	        var data={}
	       // data={displayInnerGrid:this.displayInnerGrid(this,'abd')}
	        this.callParent(data);
	    },
	    viewConfig:{
			forceFit: true,
		 	scrollOffset: 0,
			enableTextSelection:false
		},
		plugins:[
				{
					ptype: 'gridfilters'
				},
		 		{
		 			ptype:'rowexpander',
		 			expandOnDblClick:false,
		 			columnWidth:24,
		 			rowBodyTpl:new Ext.XTemplate(
		 					'<div id="set_{sid}" style="padding-top:5px;border:1px solid #dedede">',  
		 	                '</div>'  
		 			)
		 		}
		],
	 	listeners:{
	 		beforeRender:function(){
	 			var me = this;
	 			Ext.QuickTips.init();
	 		},
	 		afterrender:function(){
	 			
	 			var grid = this.grid;
	 			var me = this;
	 			this.view.on('expandBody', function (rowNode, record, expandRow, eOpts) {
	 				 var sid = 'set_'+record.get('sid');
	 				 var itemGrid = Ext.create('Sgai.view.ip.ipEntItem.IpEntItemListGrid',{renderTo:sid});
	 			})
	 			this.view.on('collapsebody', function (rowNode, record, expandRow, eOpts) {  
	 				var parent = document.getElementById('set_'+record.get('id'));  
	 			    var child = parent.firstChild;  
	 			    while (child) {  
	 			        child.parentNode.removeChild(child);  
	 			        child = child.nextSibling;  
	 			    }  
	 		    });
	 		}
	    	//selectionchange:'ipEnterpriseSelectionChange',
	    },
		columns: [
			{
			    xtype: 'rownumberer',
			    itemId:'rownumberer',
			    width:50,
			    align:'center',
			    text:'‘’'
			},
	    	{
	            xtype: 'rownumberer',
	            itemId:'rownumberer',
	            width:50,
	            align:'center',
	            text:translations.rowNumber
	        },
			{
				text:bizI18n.ipEnterprise.sid,
				filter:'list',
				dataIndex:'sid',
				hidden:true
			},
			{
				text:bizI18n.ipEnterprise.createdBy,
				filter:'list',
				dataIndex:'createdBy'
			},
			{
				text:'预警状态',
				filter:'list',
				dataIndex:'warningState',
				convertCode:'WARNING_STATE',
				renderer:function(value) {
					if(value==0){
						return '正常';
					}else{
						return '<div style="height:15px;"></div><img style="position:absolute;height: 36px;top: -5px;" src="./resources/icons/003.gif"/>';;
					}
	            }
				
			},
			{
				text:bizI18n.ipEnterprise.enterpriseName,
				filter:'list',
				dataIndex:'enterpriseName'
			},
			{
				text:bizI18n.ipEnterprise.enterpriseNature,
				filter:'list',
				dataIndex:'enterpriseNature',
				convertCode:'ENTERPRISE_NATURE',
	            renderer:function(value) {
	                return getCommonTypeItemName('ENTERPRISE_NATURE',value);
	            }
			},
			{
				text:bizI18n.ipEnterprise.enterpriseProfile,
				filter:'list',
				dataIndex:'enterpriseProfile'
			},
			{
				text:bizI18n.ipEnterprise.legalPerson,
				filter:'list',
				dataIndex:'legalPerson'
			},
			{
				text:'附件详情',
				filter:'list',
				dataIndex:'planUrl',
	//
	//
//	            xtype : 'actioncolumn',
//	            itemId:'docBrowsePlanUrl',
//	            align : 'center',

	            renderer:function(value) {
	                return 	"<a href='#' >详情</a>";
	            }
			},
			{
				text:bizI18n.ipEnterprise.remark,
				filter:'list',
				dataIndex:'remark'
			},
			{
				text:bizI18n.ipEnterprise.createdBy,
				filter:'list',
				dataIndex:'createdBy',
				hidden:true
			},
			{
				text:bizI18n.ipEnterprise.createdDt,
				filter:'list',
				xtype:'datecolumn',
				format :'Y-m-d H:i:s',
				dataIndex:'createdDt',
				hidden:true
			},
			{
				text:bizI18n.ipEnterprise.updatedBy,
				filter:'list',
				dataIndex:'updatedBy',
				hidden:true
			},
			{
				text:bizI18n.ipEnterprise.updatedDt,
				filter:'list',
				xtype:'datecolumn',
				format :'Y-m-d H:i:s',
				dataIndex:'updatedDt',
				hidden:true
			},
			{
				text:bizI18n.ipEnterprise.version,
				filter:'list',
				dataIndex:'version',
				hidden:true
			}
	    ],
	    
	    dockedItems:[
	       {
				xtype:'pagingtoolbar',
				store:'ipEnterpriseStore',
				dock:'bottom',
				displayInfo:true,
				plugins:[{
					ptype:'pagingtoolbarresizer'
				   }
				]
	       }
	   ]
	
});
第二种方法：监听containermouseover事件，鼠标移动到grid的时候变大。但是这个过程中有个问题是，我一直没找到点击时间，click不好使，点击事件效果可能会好很多。
Ext.define('Sgai.view.ds.fxpj.FxpjDsGeneralView', {
	extend:'Ext.panel.Panel',
	alias:'widget.fxpjDsGeneralView',
	layout:'fit', 
	itemId:'fxpjDsGeneralView',
	reference:'fxpjDsGeneralView',
	Mixin:'Ext.util.PositionableView',
    requires:[
    	'Sgai.view.ds.fxpj.FxpjDsGeneralQueryForm',
		'Sgai.view.ds.fxpj.FxpjDsGeneralListGrid',
		'Sgai.view.ds.fxpj.FxpjDsGeneralFactorQueryForm',
		'Sgai.view.ds.fxpj.FxpjDsGeneralFactorListGrid',
		'Sgai.view.ds.fxpj.FxpjDsGeneralController',
		'Sgai.view.ds.fxpj.FxpjDsGeneralWinController',
		'Sgai.view.ds.fxpj.FxkzAddWin',
		'Sgai.view.ds.fxpj.FxpjAddPingJiaWin',
		'Sgai.view.ds.fxpj.FxpjDsGeneralXiangQing', 
		'Sgai.view.ds.dsGeneral.DsGeneralWinController',
		'Sgai.view.ds.dsGeneral.ImageWinBolier',
		'Sgai.view.ds.dsGeneralFactor.DsGeneralFactorWinController',
		'Sgai.view.ds.dsGeneralReport.DsGeneralReportListGrid',
		'Sgai.view.ds.dsGeneralReport.DsGeneralReportWin'
    ],
    controller:'fxpjDsGeneralController',
    
	dockedItems:[
		{
    		xtype:'fxpjDsGeneralQueryForm'
    	}
	],
	items:[
		{	
			xtype:'container',
			layout:{
				type : 'vbox',//垂直盒布局
				pack : 'start',
				align : 'stretch'
			},
			
			items:[
				{	
					xtype: 'fxpjDsGeneralListGrid',
					flex:5,
					listeners:{
						containermouseover:function( me, e, eOpts ){
							if(me.up().ownerGrid.flex==5){
								return false;
							}
							var parentPanel=me.up('fxpjDsGeneralView');
							var firstPanel = parentPanel.down('fxpjDsGeneralListGrid');
							var secontPanel=parentPanel.down('fxpjDsGeneralFactorListGrid');
							var thirdPanel=parentPanel.down('dsGeneralReportListGrid')
							firstPanel.ownerGrid.flex=5
							Ext.get(firstPanel.id).slideIn('l', { duration: 100 });
							secontPanel.ownerGrid.flex=3
							thirdPanel.ownerGrid.flex=2
							parentPanel.update();

						}}
				},
				{	
					xtype: 'fxpjDsGeneralFactorListGrid',
					flex:3,
					listeners:{
						containermouseover:function( me, e, eOpts ){
							if(me.up().ownerGrid.flex==5){
								return false;
							}
							var parentPanel=me.up('fxpjDsGeneralView');
							var firstPanel = parentPanel.down('fxpjDsGeneralListGrid');//获取fxpjDsGeneralListGrid组件
							var secontPanel=parentPanel.down('fxpjDsGeneralFactorListGrid');
							var thirdPanel=parentPanel.down('dsGeneralReportListGrid')
							firstPanel.ownerGrid.flex=2
							secontPanel.ownerGrid.flex=5
							Ext.get(secontPanel.id).slideIn('r', { duration: 200 });
							thirdPanel.ownerGrid.flex=3
							parentPanel.update();

					}}
				},
				{	
					xtype: 'dsGeneralReportListGrid',
					flex:2,
					listeners:{
						containermouseover:function( me, e, eOpts ){
							if(me.up().ownerGrid.flex==5){
								return false;
							}
							var parentPanel=me.up('fxpjDsGeneralView');
							var firstPanel = parentPanel.down('fxpjDsGeneralListGrid');//获取fxpjDsGeneralListGrid组件
							var secontPanel=parentPanel.down('fxpjDsGeneralFactorListGrid');
							var thirdPanel=parentPanel.down('dsGeneralReportListGrid')
							firstPanel.ownerGrid.flex=3
							secontPanel.ownerGrid.flex=2
							thirdPanel.ownerGrid.flex=5
							Ext.get(thirdPanel.id).slideIn('b', { duration: 100 });
							parentPanel.update();

					}}
				}
			]
		}
	]
});

