'use strict';

(function () {
    angular
        .module('app.config',['restangular']) 
        .config(appConfig) 
        .factory('apiService', apiService);

    appConfig.$inject = ['RestangularProvider'];
    function appConfig(RestangularProvider) { 
        RestangularProvider.setBaseUrl('https://dev.medrecord.nl/mrprd');  
        RestangularProvider.setDefaultHeaders({
            'Accept': 'application/vnd.api',
            'Content-Type': 'application/vnd.api'
        });
    }

    apiService.$inject = ['Restangular'];
    function apiService(Restangular) {
        return {
            ehrId: 452,
            bloodpressure: function (params) {
                var url = Restangular.all('ehr/'+ this.ehrId +'/procedure/bloodpressure');
                return url.customGET(null, params).then(
                    function (data) {
                        return data;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            },
            bmi: function (params) {
                var url = Restangular.all('ehr/'+ this.ehrId +'/procedure/bmi');
                return url.customGET(null, params).then(
                    function (data) {
                        return data;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            },
            acq: function (params) {
                var url = Restangular.all('ehr/'+ this.ehrId +'/procedure/acq');
                return url.customGET(null, params).then(
                    function (data) {
                        return data;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            },
        };
    }

})();
