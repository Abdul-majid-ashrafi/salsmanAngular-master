 /**
 * Created by Welcome on 2/8/2016.
 */
angular.module("App")

.controller("loginCtrl", function ($scope,$http ,$state ,$mdDialog) {
    $scope.adminLogin = function() {
        $http.post("/LOGIN", {nam: $scope.nam})
            .success(function(data){
                //console.log(data);
                if(data){
                    localStorage.setItem("toke",data.fireBaseToken)
                    localStorage.setItem("adminId",data._id)
                    $state.go("dashboard")
                }else{
                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('Faild!')
                            .content('Incorrect Email or Password ')
                            .ok('Ok')
                    );}
            })
            .error(function(error){console.log(error)
            })
    };
});
