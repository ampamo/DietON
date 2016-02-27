Ext.define('DietonApp.overrides.MessageBox', {
	override : 'Ext.MessageBox',
	statics  : {
		YES    : { text : 'Si',       itemId : 'yes',   ui: 'action', iconAlign: 'left' },
		NO     : { text : 'No',       itemId : 'no',    iconAlign: 'right' },
		YESNO  : [
			{ text : 'Si',  itemId: 'yes', ui: 'action'},
            { text : 'No',  itemId: 'no'}
        ]
	},
	/**
	 * Fix close error
	**/
	hide        : function (animation) {
		if (this.activeAnimation && this.activeAnimation._onEnd) {
            this.activeAnimation._onEnd();
        }
        return this.callParent(arguments);
	}
});
