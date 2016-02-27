Ext.define('DietonAPP.store.History', {
    extend : 'Ext.data.Store',

    requires : [
        'DietonAPP.model.History'
    ],

    config : {
        autoLoad : true,
        model    : 'DietonAPP.model.History',
        storeId  : 'History',
        proxy    : {
            type : 'localstorage',
            id   : 'history'
        }
    }
});