Ext.define('DietonApp.model.History', {
    extend: 'Ext.data.Model',
    alias : 'model.History',

    config: {
        idProperty: 'created_at'
        fields: [
            {name: 'createdAt',   type: 'date',    dateFormat: 'time'},
            {name: 'barCode',  type: 'String'},
            {name: 'enviromentLevel',  type: 'int'},
            {name: 'puppetLevel',  type: 'int'},
            {name: 'latitudeOrigin',  type: 'float'},
            {name: 'longitudeOrigin',   type: 'float'},
            {name: 'currentLatitude', type: 'float'},
            {name: 'currentLongitude', type: 'float'},
            {name: 'currentAccuracy', type: 'float'},
            {name: 'productName', type: 'String'},
            {name: 'productSize', type: 'float'},
            {name: 'productSugar', type: 'float'},
            {name: 'productFat', type: 'float'}

        ],

        proxy: {
            type: 'localstorage',
            id: 'history'
        }
    }
    });