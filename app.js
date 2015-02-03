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
        $scope.getDesc =$scope.mgetDesc($scope.items);
    }

    function onError() {
        $scope.error = "Can't load";
    }

    findvalue = function(value) {
        return  value.ItemNumber === '2';
    };

    $scope.FindMyWS = function FindMyWS() {
        console.log(_.find($scope.items,findvalue).Description  );
    };

    $scope.WhereWS = function WhereWS() {
        console.log(_.where($scope.items,{"LabCase": "15-0001"}) );
    };

    function makeAdder(value) {
        return function(free) {
            return free + value;
        };
    }

    $scope.add10 =  makeAdder(10);
    $scope.add123 =  $scope.add10(123);


    function GetFieldByName(field) {
        return function (obj) {
            return (obj && obj[field]);
        }
    }

    $scope.mgetDesc = GetFieldByName('Description');

/*

  Functional Javascript Michael Fogus

  closures -  returning a function you can you a closure to remember the parameter.


  function makeAdder(x) {
  return function(y) {
    return x + y;
    };
   }

   // makeAdder is returning a function
   var add10 = makeAdder(10);

   //  it will remember the 10
   add10(100);

*/











}


function mainCtrl($http) {
    var self = this;

    self.name = 'DNA Worksheet Header main';

    $http.get('DNAExamw.json').then(onUserComplete,onError);

    function onUserComplete(response) {
        self.headers = response.data.DNAExamw;
    }

    function onError() {
        this.error = "Can't load";
    }


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

