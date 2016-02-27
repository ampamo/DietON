Ext.define('DietonApp.model.Config', {
    extend : 'Ext.data.Model',

    config : {
        fields : [
        	{ name : 'id' }, //local id --> uuid
        	{ name : 'last_route',      type : 'String' },
            { name : 'last_server_url', type : 'String' }
        ],
        proxy : {
            type : 'localstorage',
            id   : 'config'
        },
        identifier : {
        	type : 'uuid'
        }
    }
});
