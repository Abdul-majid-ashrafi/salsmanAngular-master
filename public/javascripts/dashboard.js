angular.module("App")

    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log ,$state,$http,$mdDialog) {


$scope.map = function(ab){
    $timeout(function(){
        $state.go("orderBooking")
    },10000);
    var lat = ab.position.lat;
    var long = ab.position.long;
//console.log(ab.position)

    angular.extend($scope, {
        london: {
            lat: lat,
            lng: long,
            zoom: 30
        },
        defaults: {
            zoomAnimation: false,
            markerZoomAnimation: false,
            fadeAnimation: false
        },
        markers: {
            london: {
                lat: lat,
                lng: long,
                message: "Salesman here!",
                focus: true,
                draggable: false
            }
        }
    });
}







        /*==========SHOW BOOKING ORDER IN ALERT FROM  IONIC========*/
        var ref = new Firebase("https://salsmanapp.firebaseio.com/notific");
        ref.on("child_added",function(msg){
            console.log(msg.val());
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Order')
                    .content("Hey I Am "+msg.val().name + " My Order Is "+msg.val().msg)
                    .ok('Ok'))});
/*====================SHOW BOOKING ORDER TO SALESMAN AND REMOVE FROM FIREBASE======== */
        var check = localStorage.getItem("adminId");
        $http.get("/getOrder/"+check)
            .then(function(success){
                ref.remove();
                console.log(success);
                $scope.getUserOrder = success.data
            },function(err){
                console.log(err)
            });





        /*========GET ADMIN NAME FOR HOME PAGE=========*/
        var fireBaseToken = localStorage.getItem("toke");
        $http.get("/getAdmin?token="+fireBaseToken)
            .then(function(success){
                //alert(success.data.adminName);
                $scope.getAdminName = success.data
            },function(err){
                console.log(err)});




        /*==================*/
        $scope.logOut = function(){
            localStorage.removeItem("toke");
            $state.go("loginAdmin")
        };
        /*==================*/
    });
