Ext.define('DietonApp.store.History', {
    extend : 'Ext.data.Store',

    requires : [
        'DietonApp.model.History'
    ],

    config : {
        autoLoad : true,
        model    : 'DietonApp.model.History',
        storeId  : 'History',
        proxy    : {
            type : 'localstorage',
            id   : 'history'
        },
        sorters            : [
            {
                property  : "creationDate",
                direction : "DESC"
            }
        ]
    }
});
