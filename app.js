/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'DietonApp',

    requires: [
        'Ext.LoadMask',
        'Ext.MessageBox',
        'DietonApp.overrides.MessageBox'
    ],

    controllers : [
        'Router',
        'Home'
    ],

    stores : [
        'Config',
        'History',
        'User'
    ],
    models: [
        'User',
        'Config',
        'History'
    ],

    views : [
        'ux.LoadingMask'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    /*************Config*******************/
    getConfig : function (){
        if(Ext.getStore("Config").getCount() === 0) Ext.getStore("Config").load();
        return Ext.getStore("Config").first();
    },
    /*************Current User*******************/
    getCurrentUser : function () {
        if(Ext.getStore("User").getCount() === 0) Ext.getStore("User").load();
        return Ext.getStore("User").first();
    },
    /********************************************/
    getActiveView : function () {
        return Ext.Viewport.getActiveItem();
    },
    getActiveRoute: function () {
        var history = this.getHistory(),
            actions = history.getActions();
        return actions[actions.length - 1].config;
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        window.initMaps();
    },

    /*************Loading Message****************/
    ldMask  : null,
    loading : false,
    getLdMask : function () {
        return this.ldMask;
    },
    setLdMask : function (value) {
        this.ldMask = value;
    },
    isLoading : function () {
        return this.loading;
    },
    setLoading : function (value) {
        this.loading = value;
    },
    loadingMask : function (b, loadingMessage) {
        loadingMessage = loadingMessage || "Cargando...";

        this.setLoading(b);

        if(b){//show mask or change message value
           if(this.getLdMask() !== null){//if the loading mask is active then change the message
              this.getLdMask().setMessage(loadingMessage);
           }else{
                Ext.Viewport.setMasked({
                    xtype   : 'loadingmask',
                    message : loadingMessage
                });
                this.setLdMask(Ext.Viewport.getMasked());
            }
        }else{//hide mask
            var maskToDestroy = this.getLdMask();
            this.setLdMask(null);
            Ext.Viewport.setMasked(false);
        }
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
