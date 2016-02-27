Ext.define('DietonApp.store.User', {
    extend : 'Ext.data.Store',

    requires : [
        'DietonApp.model.User'
    ],

    config : {
        autoLoad : true,
        model    : 'DietonApp.model.User',
        storeId  : 'User',
        proxy    : {
            type : 'localstorage',
            id   : 'user'
        }
    }
});
