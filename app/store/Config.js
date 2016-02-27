Ext.define('DietonApp.store.Config', {
    extend : 'Ext.data.Store',

    requires : [
        'DietonApp.model.Config'
    ],

    config : {
        autoLoad : true,
        model    : 'DietonApp.model.Config',
        storeId  : 'Config',
        proxy    : {
            type : 'localstorage',
            id   : 'config'
        }
    }
});
