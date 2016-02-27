Ext.define('DietonApp.controller.Home', {
    extend: 'Ext.app.Controller',

    config: {
        lasProductFind : null,
        views : [
            'Home'
        ],
        refs: {
            homeView             : 'homeview',
            reloadBalanceButton  : 'homeview balancetoolbar button#reloadBalance',
            captureBarcodeButton : 'homeview button#captureBarcode',
            approveButton        : 'homeview button#approve',
            rejectButton         : 'homeview button#reject',
            searchButton         : 'homeview button#searchProduct'
        },
        control: {
            homeView : {
                init   : 'onInitHomeView',
                goback : 'onHomeViewGoBack'
            },
            captureBarcodeButton : {
                tap : 'onCaptureBarcodeButtonTap'
            },
            approveButton : {
                tap : 'onApproveButtonTap'
            },
            rejectButton : {
                tap : 'onRejectButtonTap'
            },
            searchButton : {
                tap : 'onSearchButtonTap'
            }
        }
    },

    //called when the Application is launched, remove if not needed
    launch: function(app) {

    },

    onHomeViewGoBack : function (app, defaultFn) {
        //app.close();
        defaultFn();
    },

    onInitHomeView : function (homeView) {
        var me                      = this,
            currentUser             = me.getApplication().getCurrentUser(),
            currentDateAtZoreHours  = new Date(),
            historyStore            = Ext.getStore('History');
        currentDateAtZoreHours.setHours(0, 0, 0, 0);
        historyStore.filterBy(function (history) {
            return history.get('createdAt').getTime() >= currentDateAtZoreHours.getTime();
        });
        var lastHistory;
        if(historyStore.getCount()){
            lastHistory = historyStore.last();
        }else{
            //start with neutral state
            lastHistory = Ext.create('DietonApp.model.History', {
                enviromentLevel : 3,
                puppetLevel     : 3
            });
        }
        homeView.down('container#drawingContainer').setRecord(lastHistory);
        homeView.down('container#drawingContainer').setHeight(Ext.Viewport.windowHeight - 175);
    },
    onReloadBalanceButtonTap : function () {
        this.updateBalance();
    },
    onCaptureBarcodeButtonTap : function () {
        //LANZAMOS CAPTURA DE BARCODE
        var me = this;
        if(window.cordova){
            cordova.plugins.barcodeScanner.scan(function (result) {
                if(!result.cancelled) me.createNewHistory(result);
            }, function (error) {
                Ext.Msg.alert("Scanning failed: " + error);
            });
        }else{
            me.createNewHistory("5449000051981");
        }
    },
    onApproveButtonTap : function () {
        var me          = this,
            homeView    = me.getApplication().getActiveView(),
            product     = homeView.down('container#productInfo').getData(),
            currentUser = me.getApplication().getCurrentUser();

        var productSize   = product.quantity.split(' ')[0];
        var productIR     = 100 * product.nutriments.sugars / 90;
        var newSugarLevel = currentUser.get('currentSugarLevel') + (productIR * currentUser.getKcal() / 2000);
        var newEnvLevel   = currentUser.get('currentEnviromentLevel') + (product.ecoFootprint) ? product.ecoFootprint : 0;

        if((productIR * currentUser.getKcal() / 2000) <= 5){
            newSugarLevel -= 10;//por defecto
        }
        var puppetLevel, enviromentLevel;
        if(newSugarLevel <= 0){
            puppetLevel = 1;
        }else if(newSugarLevel <= 20){
            puppetLevel = 2;
        }else if(newSugarLevel <= 60){
            puppetLevel = 3;
        }else if(newSugarLevel <= 100){
            puppetLevel = 4;
        }else{
            puppetLevel = 5;
        }

        if(((product.ecoFootprint) ? product.ecoFootprint : 0) <= 5){
            newEnvLevel -= 10;//por defecto
        }

        if(newEnvLevel <= 0){
            enviromentLevel = 1;
        }else if(newEnvLevel <= 20){
            enviromentLevel = 2;
        }else if(newEnvLevel <= 60){
            enviromentLevel = 3;
        }else if(newEnvLevel <= 100){
            enviromentLevel = 4;
        }else{
            enviromentLevel = 5;
        }

        var history  = Ext.create('DietonApp.model.History', {
            barCode          : product.barcode,
            enviromentLevel  : enviromentLevel,
            puppetLevel      : puppetLevel,
            latitudeOrigin   : product.latitudeOrigin,
            longitudeOrigin  : product.longitudeOrigin,
            currentLatitude  : product.currentLatitude,
            currentLongitude : product.currentLongitude,
            currentAccuracy  : product.currentAccuracy,
            productName      : product.product_name,
            productSize      : productSize,
            productSugar     : product.nutriments.sugars,
            productFat       : product.nutriments['saturated-fat'],
            createdAt        : new Date()
        });
        history.save();

        currentUser.set('currentSugarLevel', newSugarLevel);
        currentUser.set('currentEnviromentLevel', newEnvLevel);
        currentUser.save();
        homeView.down('container#drawingContainer').setRecord(history);
        homeView.down('button#captureBarcode').show();
        homeView.down('button#searchProduct').show();
        homeView.down('container#productInfo').setData(null);
        homeView.down('container#productInfo').hide();
    },
    onRejectButtonTap : function () {
        var me          = this,
            homeView    = me.getApplication().getActiveView();
        homeView.down('button#captureBarcode').show();
        homeView.down('button#searchProduct').show();
        homeView.down('container#productInfo').setData(null);
        homeView.down('container#productInfo').hide();
    },
    onSearchButtonTap : function () {
        Ext.Msg.alert('', 'Pronto podrás buscar sin utilizar el sistema de escaneo, mientras tanto te animamos a que escanees el código de barras de cada producto con el botón "Escanear Código"');
    },
    createNewHistory : function (barcode) {
        var me = this;
        me.getApplication().loadingMask(true, "Consultando");
        Ext.Ajax.request({
            url                 : "http://world.openfoodfacts.org/api/v0/product/" + barcode.text + ".json",
            disableCaching      : false,
            //disableCachingParam : '_dc' + Ext.Date.format(new Date(), 'd/m/y-H:i:s'),
            method              : "GET",
            success : function (response) {
                console.log(barcode.text + '*****RES ANDRES**--> ' + response.responseText);
                var resJson = JSON.parse(response.responseText);
                if(resJson.status === 1){
                    resJson.product.barcode = barcode.text;
                    var renderData = function (product) {
                        var homeView = me.getApplication().getActiveView();
                        homeView.down('button#captureBarcode').hide();
                        homeView.down('button#searchProduct').hide();
                        homeView.down('container#productInfo').setData(product);
                        homeView.down('container#productInfo').show();
                    };

                    navigator.geolocation.getCurrentPosition(function (currentLocation) {
                        resJson.product.currentLatitude  = currentLocation.coords.latitude;
                        resJson.product.currentLongitude = currentLocation.coords.longitude;
                        resJson.product.currentAccuracy  = currentLocation.coords.accuracy;
                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode({
                            'address' : resJson.product.countries
                        }, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK){
                                var originLocation = results[0].geometry.location;
                                resJson.product.latitudeOrigin  = originLocation.lat();
                                resJson.product.longitudeOrigin = originLocation.lng();
                                var distance = me.getDistanceFromLatLonInKm(resJson.product.latitudeOrigin, resJson.product.longitudeOrigin, currentLocation.coords.latitude, currentLocation.coords.longitude);
                                resJson.product.ecoFootprint = 0.35 * distance;
                            }
                            renderData(resJson.product);
                            me.getApplication().loadingMask(false);
                        });
                    },
                    function (error) {
                        me.getApplication().loadingMask(false);
                        renderData(resJson.product);
                    });
                }else{
                    me.getApplication().loadingMask(false);
                    Ext.Msg.alert('Error', 'No fue posible realizar la consulta, inténtalo de nuevo.');
                }
            },
            failure : function (response) {
                me.getApplication().loadingMask(false);
                Ext.Msg.alert('Error', 'No fue posible realizar la consulta, inténtalo de nuevo.');
            },
            callback : function (options, success, response) {
                console.log("Response success: " + success);
                console.log("responseText: "     + response.responseText);
                console.log("responseStatus: "   + response.status);
            }
        });
    },
    getDistanceFromLatLonInMeters : function (lat1,lon1,lat2,lon2) {
        var me = this;
        return me.getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) * 1000/1;// Distance in m
    },
    getDistanceFromLatLonInKm : function (lat1,lon1,lat2,lon2) {
        var R    = 6371, // Radius of the earth in km
            dLat = this.deg2rad(lat2-lat1),  // deg2rad below
            dLon = this.deg2rad(lon2-lon1),
            a    = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2),
            c    = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
            d    = R * c; // Distance in km
        return d;
    },
    deg2rad : function (deg) {
      return deg * (Math.PI/180)
    }
});
