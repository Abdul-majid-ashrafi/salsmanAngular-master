angular.module("App")

    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log ,$state,$http,$mdDialog) {




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
