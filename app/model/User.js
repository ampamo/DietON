Ext.define('DietonApp.model.User', {
    extend: 'Ext.data.Model',
    alias : 'model.User',

    config: {
        fields: [
            {name: 'gender',                 type: 'String'},
            {name: 'birthday',               type: 'date', dateFormat: 'time'},
            {name: 'weight',                 type: 'float'},//KG
            {name: 'height',                 type: 'float'},//CM
            {name: 'lastReStartAt',          type: 'date', dateFormat: 'time'},
            {name: 'score',                  type: 'int', defaultValue: 0},
            {name: 'currentSugarLevel',      type: 'float', defaultValue : 0},
            {name: 'currentEnviromentLevel', type: 'float', defaultValue : 0}
        ],

        proxy: {
            type: 'localstorage',
            id: 'user'
        },

        identifier : {
            type : 'uuid'
        },

        validations: [
            {type:'inclusion',  field:'gender', list: ['MALE', 'FEMALE']},
            {type: 'presence',  field: 'age'},
            {type: 'presence',  field: 'weight'},
            {type: 'presence',  field: 'height'}
        ]
    },
    getKcal : function () {
        var me = this,
            param1, param2, param3, param4;
        if(me.get('gender') === 'MALE'){
            param1 = 66.5;
            param2 = 13.75;
            param3 = 5;
            param4 = 6.78;
        }else{
            param1 = 665;
            param2 = 9.56;
            param3 = 1.85;
            param4 = 4.68;
        }
        return param1 + (param2 * me.get('weight')) + (param3 * me.get('height')) - (param4 * me.getAge());
    },
    getAge : function () { // birthday is a date
        var ageDifMs = Date.now() - this.get('birthday').getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
});
