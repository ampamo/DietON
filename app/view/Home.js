Ext.define('DietonApp.view.Home', {
	extend : 'Ext.Panel',
	alias  : 'widget.homeview',

	config : {
		itemId     : 'homeView',
		layout     : 'vbox',
		scrollable : true,
		items      : [
			{
				xtype  : 'container',
				margin : '5px auto',
				itemId : 'drawingContainer',
				tpl    : new Ext.XTemplate(
					'<div class="background-puppet {[this.getEnviromentCls(values)]}" style="height:{[this.getWindowHeight()]};">',
						'<img style="margin-left:{[this.getPuppetMarginLeft(values)]}; margin-top:{[this.getPuppetMarginTop(values)]};" class="{[this.getPuppetCls(values)]}" src="{[this.getPuppetImg(values)]}" />',
					'</div>',
					{
						getWindowHeight : function () {
							return Ext.Viewport.windowHeight - 45 + 'px !important';
						},
						getWindowWidth : function () {
							return Ext.Viewport.windowWidth;
						},
						getEnviromentCls : function (values) {
							switch(values.enviromentLevel){
								case 1:
									return 'first-state';
									break;
								case 2:
									return 'second-state';
									break;
								case 3:
									return 'neutral-state';
									break;
								case 4:
									return 'fourth-state';
									break;
								case 5:
									return 'fifth-state';
									break;
								default:
									return '';
							}
						},
						getPuppetImg : function (values) {
							switch(values.puppetLevel){
								case 1:
									return 'resources/icons/puppets/Personaje-01.png';
									break;
								case 2:
									return 'resources/icons/puppets/Personaje-02.png';
									break;
								case 3:
									return 'resources/icons/puppets/Personaje-03.png';
									break;
								case 4:
									return 'resources/icons/puppets/Personaje-04.png';
									break;
								case 5:
									return 'resources/icons/puppets/Personaje-05.png';
									break;
								default:
									return '';
							}
						},
						getPuppetCls : function (values) {
							switch(values.puppetLevel){
								case 1:
									return 'puppet-first-state';
									break;
								case 2:
									return 'puppet-second-state';
									break;
								case 3:
									return 'puppet-neutral-state';
									break;
								case 4:
									return 'puppet-fourth-state';
									break;
								case 5:
									return 'puppet-fifth-state';
									break;
								default:
									return '';
							}
						},
						getPuppetMarginLeft : function (values) {
							switch(values.puppetLevel){
								case 1:
									return ((Ext.Viewport.windowWidth - 500) / 2) + 'px !important';
									break;
								case 2:
									return ((Ext.Viewport.windowWidth - 450) / 2) + 'px !important';
									break;
								case 3:
									return ((Ext.Viewport.windowWidth - 400) / 2) + 'px !important';
									break;
								case 4:
									return ((Ext.Viewport.windowWidth - 350) / 2) + 'px !important';
									break;
								case 5:
									return ((Ext.Viewport.windowWidth - 300) / 2) + 'px !important';
									break;
								default:
									return '';
							}
						},
						getPuppetMarginTop : function (values) {
							switch(values.puppetLevel){
								case 1:
									return ((Ext.Viewport.windowHeight - 800) / 2) + 'px !important';
									break;
								case 2:
									return ((Ext.Viewport.windowHeight - 750) / 2) + 'px !important';
									break;
								case 3:
									return ((Ext.Viewport.windowHeight - 700) / 2) + 'px !important';
									break;
								case 4:
									return ((Ext.Viewport.windowHeight - 650) / 2) + 'px !important';
									break;
								case 5:
									return ((Ext.Viewport.windowHeight - 600) / 2) + 'px !important';
									break;
								default:
									return '';
							}
						}
					}
				)
			},
			{
				xtype  : 'container',
				layout : 'hbox',
				docked : 'bottom',
				items  : [
					{
						xtype     : 'button',
						itemId    : 'searchProduct',
						height    : 60,
						flex      : 1,
						text      : 'Buscar Producto',
						iconAlign : 'center',
						iconCls   : 'tickIcon',
						icon      : 'resources/icons/buttons/BOTONES-45-02.png',
						cls       : 'button-ivan2'
					},
					{
						xtype     : 'button',
						itemId    : 'captureBarcode',
						height    : 60,
						flex      : 1,
						text      : 'Escanear Código',
						iconAlign : 'center',
						iconCls   : 'tickIcon',
						icon      : 'resources/icons/buttons/BOTONES-45-01.png',
						cls       : 'button-ivan2'
					}
				]
			},
			{
				xtype  : 'container',
				itemId : 'productInfo',
				cls    : 'product-info',
				hidden : true,
				height : 175,
				tpl    : new Ext.XTemplate(
					'<div class="">',
						'<center><div>{product_name}</div></center>',
						'<table>',
							'<thead></thead>',
							'<tbody>',
								'<tr>',
									'<td>Azúcares: </td>',
									'<td>{[this.getSugars(values)]}</td>',
								'</tr>',
								'<tr>',
									'<td>Grasa Saturada: </td>',
									'<td>{[this.getSaturatedFat(values)]}</td>',
								'</tr>',
								'<tr>',
									'<td>Huella Ecológica: </td>',
									'<td>{[this.getEcoFootPrint(values)]}</td>',
								'</tr>',
							'</tbody>',
						'</table>',
					'</div>',
					{
						getEcoFootPrint : function (values) {
							if(values.ecoFootprint) return values.ecoFootprint.toFixed(2) + 'g de CO2';
							else return 'No calculada';
						},
						getSaturatedFat : function (values) {
							if(values.nutriments['saturated-fat']) return values.nutriments['saturated-fat'] + 'g';
							return '';
						},
						getSugars : function (values) {
							if(values.nutriments['sugars']) return values.nutriments['sugars'] + 'g';
							return '';
						}
					}
				),
				items : [
					{
						xtype  : 'container',
						layout : 'hbox',
						docked : 'bottom',
						cls    : 'product-info-buttons',
						items  : [
							{
								xtype     : 'button',
								itemId    : 'reject',
								text      : '',
								width     : 82,
								height    : 85,
								docked    : 'left',
								iconAlign : 'center',
								iconCls   : 'tickIcon',
								icon      : 'resources/icons/buttons/BOTONES-45-03.png',
								cls       : 'button-ivan'
							},
							{
								xtype     : 'button',
								itemId    : 'approve',
								text      : '',
								width     : 82,
								height    : 85,
								docked    : 'right',
								iconCls   : 'tickIcon',
								icon      : 'resources/icons/buttons/BOTONES-45-04.png',
								iconAlign : 'center',
								cls       : 'button-ivan'
							}
						]
					}
				]
			}
		]
	}
});
