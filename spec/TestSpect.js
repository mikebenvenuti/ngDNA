


describe("Worksheet Controller  Start", function() {
        var lightproto;
        beforeEach(module('DNA'));
        beforeEach(inject( function(_lightproto_) {
             lightproto = _lightproto_;

        }))

        describe('lightproto', function() {


            it('should turn on a switch', function() {
                expect(lightproto.isOn()).toBe(true);
            });

            it('should turn off a switch', function() {
                lightproto.toggle();
                expect(lightproto.isOn()).toBe(false);
            })
        })

        describe('wsCtrl', function() {


            var ctrl, scope, $httpBackend;



            beforeEach(inject(function(_$httpBackend_,$rootScope,$controller) {
                $httpBackend = _$httpBackend_;
                $httpBackend.expectGET('DNAWdata.json').respond(
                    [
                        {"WSID": "1", "LabCase": "15-0001", "ItemNumber": "1", "Description": "Shirt"}
                    ]
                     );

                scope = $rootScope.$new();
                ctrl = $controller('wsCtrl', {$scope : scope} )
            }  ));

            it('!!!!!!!!!!!!!!!!*** make adder add  ', function() {

                expect(scope.add10(100)).toBe(110);
            });

            it('*** should create  worksheets model with 3 worksheets fetched from ***', function() {
                expect(scope.items).toBeUndefined();
                $httpBackend.flush();


                expect(scope.items).toEqual([
                    {"WSID": "1", "LabCase": "15-0001", "ItemNumber": "1", "Description": "Shirt"}
                ] );
            });



        })
    }
);




describe("Main Controller2", function() {
        var ctrl, scope, $httpBackend;

        beforeEach( module('DNA'));
        beforeEach(inject(function(_$httpBackend_,$controller) {

           ctrl = $controller('mainCtrl'  );
           $httpBackend = _$httpBackend_;

           $httpBackend.expectGET('DNAExamw.json').respond(
                           {  "DNAExamw" : [
                     {   "WSID": "1", "Analyst" : "Mike", "Date" : "01/05/2015", "Worksheet" : "Extraction" } ,
                     {   "WSID": "2", "Analyst" : "Matt", "Date" : "01/07/2015", "Worksheet" : "Quant" } ,
                     {   "WSID": "3", "Analyst" : "Mark", "Date" : "01/09/2015", "Worksheet" : "Amp" }
                    ]} );


            }  ));
        describe('MainCtrl', function() {

            it('should get name of Main Controller ', function() {

                expect(ctrl.name).toEqual('DNA Worksheet Header main');
            });

            it('should get all the headers from DNAEXAMW ', function() {
                expect(ctrl.headers).toBeUndefined();
                $httpBackend.flush();

                expect(ctrl.headers).toEqual([
                    {   "WSID": "1", "Analyst" : "Mike", "Date" : "01/05/2015", "Worksheet" : "Extraction" } ,
                    {   "WSID": "2", "Analyst" : "Matt", "Date" : "01/07/2015", "Worksheet" : "Quant" } ,
                    {   "WSID": "3", "Analyst" : "Mark", "Date" : "01/09/2015", "Worksheet" : "Amp" }

                ]);
            });



        })
    }
)