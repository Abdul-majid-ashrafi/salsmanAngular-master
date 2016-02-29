/*
 * Created by Welcome on 2/5/2016.
 */

angular.module("App")

.controller("signCtrl",function($scope ,$http ,$state){
$scope.signUpAdmin = function (user) {
    //console.log(user);
    $http.post("/ADMSIGN",user)

        .then(function (datas){
            //console.log(datas.data.fireBaseToken);
            if(datas){
                localStorage.setItem("toke",datas.data.fireBaseToken);
                $state.go("dashboard")
            }
        },function(err){
            console.log(err);
        }
    );
}});

