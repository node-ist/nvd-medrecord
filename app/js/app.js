'use strict';

angular
    .module('myApp', ['nvd3', 'app.config'])
    .controller('ChartController', ChartController);

ChartController.inject = ['$scope','apiService'];
function ChartController($scope,apiService) {
    var vm = this;
    vm.bloodpressureShow = bloodpressureShow;
    vm.bmiShow = bmiShow;
    vm.acqShow = acqShow;   
    vm.params = {
        limit: 100, 
        date: '2015-01-01T00:00:00+00:00/2015-04-01T00:00:00+00:00',
        authToken: 'helloletmeinplease'
    };
    vm.chartOptions = {};
    vm.chartData = [];  
    vm.activebtn = 'blood';

    function bloodpressureShow() {
        vm.activebtn = 'blood';
        vm.chartOptions = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 70,
                    bottom: 65,
                    left: 50 
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Date',
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 30
                },
                yAxis: {
                    axisLabel: 'Blood pressure',
                    axisLabelDistance: -10
                },
                callback: function(chart){
                }
            },
            title: {
                enable: true,
                text: 'Blood pressure'
            }
        }; 

        apiService.bloodpressure(vm.params).then(function (data) {           
            var diastolic = [],
                systolic = [];

            data.measurement.forEach(function(item){
                var time = new Date(item.time).getTime();
                diastolic.push({x: time, y: item.diastolic});
                systolic.push({x: time, y: item.systolic});
            });

            vm.chartData = [
                {
                    values: diastolic,     
                    key: 'diastolic', 
                    color: '#ff7f0e'
                },
                {
                    values: systolic,
                    key: 'systolic',
                    color: '#2ca02c'
                }
            ];            
        });
    }

    function bmiShow() {
        vm.activebtn = 'bmi';
        vm.chartOptions = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 70,
                    bottom: 65,
                    left: 50 
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                xAxis: {
                    axisLabel: 'Date',
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 30
                },
                yAxis: {
                    axisLabel: 'BMI, kg/m2',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                },
                tooltip: {
                    keyFormatter: function(d) {
                        return d3.time.format('%m/%d/%y, %I:%M %p')(new Date(d))
                    }
                },
                callback: function(chart){
                },
            },
            title: {
                enable: true,
                text: 'BMI procedure'
            }
        }; 

        apiService.bmi(vm.params).then(function (data) {  
            var bmis = [],
                weights = [];

            data.measurement.forEach(function(item){
                var time = new Date(item.time).getTime();
                bmis.push({x: time, y: item.bmi});
            });  

            vm.chartData = [
                {     
                    key: 'bmi',
                    values: bmis
                },
            ];            
        }); 
    }

    function acqShow() {
        vm.activebtn = 'acq';
        vm.chartOptions = {
            chart: {
                type: 'historicalBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 70,
                    bottom: 65,
                    left: 50 
                },
                x: function(d){return d.x;},
                y: function(d){return d.y;}, 
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.1f')(d);
                },
                xAxis: {
                    axisLabel: 'Date',
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    rotateLabels: 30,
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'ACQ score',
                    axisLabelDistance: -10,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },
                tooltip: {
                    keyFormatter: function(d) {
                        return d3.time.format('%x')(new Date(d));
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };  

        apiService.acq(vm.params).then(function (data) {
               
            var scores = [];

            data.measurement.forEach(function(item){
                var time = new Date(item.time).getTime();
                scores.push({x:time, y:item.acqScore}); 
            }); 

            vm.chartData = [
                {
                    key : 'acq' ,
                    bar: true,
                    values:  scores
                }
            ];             
        });   
    }
    
   bloodpressureShow();

}