/**
 * Created by Welcome on 2/9/2016.
 */

angular.module("App")
    .controller('userSignUp', function ($scope ,$http ,$state,$rootScope, $timeout, $mdSidenav, $log) {
        $scope. img ="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcScU5gOvAwFbLLOd-c9vX7A3Ab2bR1_OmhZG8s7D4_rYvc5THNqRMnWZQ";

        $scope.userData = {};
        $scope.userData.userAdmin = localStorage.getItem("adminId");

        $scope.userAdd = function(){
            $http.post("/POST",$scope.userData)
                .then(function(createUserData){
                    localStorage.setItem("tokenUser", createUserData.data.userAdmin);
                    console.log(createUserData.data)

                },function(err){
                    console.log(err);
                    console.log("You get an Error")
                });
        };

      /*  $scope.show = function(){
            $http.get("/getUsers/"+ $scope.userData.userAdmin).then(function(d){
                $scope.mavia = d.data;
            });
        }*/




        $scope.toggleLeft = buildDelayedToggler('left');

        $http.get("/getUsers/"+ $scope.userData.userAdmin).then(function(d){
            $scope.mavia = d.data;
        });

        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

    });
