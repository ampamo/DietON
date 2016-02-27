Ext.define('DietonApp.model.User', {
    extend: 'Ext.data.Model',
    alias : 'model.User',

    config: {
        fields: [
            {name: 'gender',  type: 'String'},
            {name: 'age',   type: 'int'},
            {name: 'weight', type: 'float'},
            {name: 'height', type: 'float'},
            {name: 'lastReStart', type: 'date', dateFormat: 'time'},
            {name: 'dailyScore',  type: 'int', defaultValue: 0}
        ],

        proxy: {
            type: 'localstorage',
            id: 'user'
        },

        validations: [
            {type:'inclusion',  field:'gender', list: ['Chico', 'Chica']},
            {type: 'presence',  field: 'age'},
            {type: 'presence',  field: 'weight'},
            {type: 'presence',  field: 'height'}
        ]
    }
    });