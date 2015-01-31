angular.module('DNA',['ui.router'])
    .config(theRoutes)
    .controller('mainCtrl',mainCtrl)
    .controller('wsCtrl',wsCtrl)
    .factory('LoadDNAWData', LoadDNAWData);




function LoadDNAWData($http) {

    var DNAWDATA = $http.get( 'DNAWdata.json').success(function(response)
    {  return response}).error ( function(data) { });

}

function wsCtrl($scope,$http,$stateParams) {

    $scope.ThisWorksheetID = $stateParams.WSID;


    $http.get('DNAWdata.json').then(onUserComplete,onError);


    function onUserComplete(response) {
        $scope.items = response.data;
    };

    function onError(reason) {
        $scope.error = "Can't load";
    };

    findvalue = function(value) {
        return  value.ItemNumber === '2';
    }

    $scope.FindMyWS = function FindMyWS() {

        console.log(_.find($scope.items,findvalue).Description  );
        console.log('FindMyWS');
    }

}


function mainCtrl($http) {
    var self = this;

    self.name = 'DNA Worksheet Header main';

    $http.get('DNAExamw.json').then(onUserComplete,onError);

    function onUserComplete(response) {
        self.headers = response.data.DNAExamw;
    };

    function onError(reason) {
        this.error = "Can't load";
    };


}


function theRoutes($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/main');

    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'ExamWorksheets.html',
            controller: 'mainCtrl'
        })
        .state('main.detail', {
            url: '/:WSID',
            templateUrl: 'index.html',
            controller: 'wsCtrl'

        })



}

