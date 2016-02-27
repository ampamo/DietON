Ext.define('DietonApp.controller.Router', {
    extend : 'Ext.app.Controller',

    config : {
        views : [
            //'ux.BackButton'
        ],
        before : {
            showHome            : [ 'authenticate', 'showHome', 'saveRoute' ],
            //showChangePassword     : [ 'authenticate', 'saveRoute' ],
            //showCreateMobileTopup  : [ 'authenticate', 'saveRoute' ],
            //showMobileTopupList    : [ 'authenticate', 'saveRoute' ],
            //showMobileTopupSummary : [ 'authenticate', 'saveRoute' ],
            //showLogin              : [ 'checkUserAccount', 'saveRoute' ],
            //showAccounts           : [ 'checkAccounts', 'saveRoute' ],
            showEditUser             : [ 'checkUserId', 'saveRoute' ]
        },
        routes : {
            ''                   : 'showHome',
            //'balance'            : 'showBalance',
            //'login'              : 'showLogin',
            //'logout'             : 'signOut',
            //'accounts'           : 'showAccounts',
            'createAccount'      : 'showCreateUser',
            'user/:id'           : 'showEditUser',
            //'changePassword'     : 'showChangePassword',
            //'createMobileTopup'  : 'showCreateMobileTopup',
            //'mobileTopupList'    : 'showMobileTopupList',
            //'mobileTopupSummary' : 'showMobileTopupSummary'
        },
        refs : {

        },
        control : {
            backButton : {
                tap: 'onBackButtonTap'
            }
        }
    },

    //called when the Application is launched, remove if not needed
    launch : function (app) {

    },

    createFakeUser : function () {

    },

    authenticate : function (action) {
        var me = this;
        if(!me.getApplication().getCurrentUser()){
            me.getApplication().redirectTo('createAccount');
        }else{
            action.resume();
        }
    },
    //befores
    restoreLastRoute : function (action) {
        if(action.getUrl() === ''){
            var config = this.getApplication().getConfig();
            if(config.get('last_route') && config.get('last_route') !== ''){
                this.getApplication().redirectTo(config.get('last_route'));
            }else{
                action.resume();
            }
        }else{
            action.resume();
        }
    },
    saveRoute : function (action) {
        var config = this.getApplication().getConfig();
        config.set('last_route', action.getUrl());
        config.save();
        action.resume();
    },
    checkUserAccount : function (action) {
        var me = this;
        if(!me.getApplication().getDefaultUser()){
            me.getApplication().redirectTo('accounts');
        }else if(me.getApplication().getCurrentUser()){
            me.getApplication().redirectTo('balance');
        }else{
            action.resume();
        }
    },
    checkUserId : function (action) {
        var me = this;
        var checkUser = function () {
            var userRecord = Ext.getStore('User').findRecord('id', action.getArgs()[0]);
            if(userRecord){
                action.resume();
            }else{
                me.getApplication().alertFailure('No Usuario', 'La cuenta de usuario especificada no existe');
            }
        };
        if(Ext.getStore('User').getCount() === 0){
            Ext.getStore('User').load({
                callback : function () {
                    checkUser();
                }
            });
        }else{
            checkUser();
        }
    },
    //Route Functions
    /****************Home*****************/
    showHome : function () {
        var homeView = Ext.create('DietonApp.view.Home');
        this.showView(homeView);
        homeView.fireEvent('init', homeView);
    },
    /**************User***************/
    showCreateUser : function () {
        this.showView(Ext.create('DietonApp.view.CreateUser'));
    },
    showEditUser: function (user_id) {
        var user = Ext.getStore('User').findRecord('id', user_id);
        var editUserView = Ext.create('RCargas.view.EditUser');
        editUserView.down('useraccountform').setRecord(user);
        this.showView(editUserView);
    },
    /**************Main view***************/
    showView : function (view) {
        this.cleanViewPort(true);
        Ext.Viewport.add(view);
    },
    /**
     * clean view port
     * @param  {Boolean} destroy        Indicates if viewport's items must be destroy on remove
     * @return ;
     */
    cleanViewPort : function (destroy) {
        var me         = this,
            mainMenuId = me.getApplication().getController('MainMenu').getMainMenuId();
        Ext.Viewport.getItems().each(function ( item , index ) {
            if((item.getItemId() !== mainMenuId)){//remove if it isn't main menu
                if(item.getId() === Ext.Msg.getId()){//if item is msg
                    destroy = false;
                }else if(item.getId && item.getId().indexOf('mask') >= 0){//if item is msg mask
                    destroy = false;
                }
                Ext.Viewport.remove(item, destroy);
            }else if(!me.getApplication().getCurrentUser()){//remove main manu if sesion isn't active
                Ext.Viewport.remove(item, true);
            }
        });
    }
});
