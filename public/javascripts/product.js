/**
 * Created by Welcome on 2/13/2016.
 */

angular.module("App")

.controller("order",function($scope,$state,$http,$rootScope) {
        $scope.proData = {};
        $scope.proData.userAdmin = localStorage.getItem("adminId");

            $scope.productADD = function () {
            $http.post("/Product", $scope.proData)
                .then(function (product) {
                    localStorage.setItem("tokenProduct", product.data.userAdmin);
                    console.log(product.data)
                }, function (err) {
                    console.log(err);
                });
        };

        $scope.showPro = function () {
            $http.get("/getOrderName?prot="+ $scope.proData.userAdmin)
                .then(function (d) {
                console.log(d.data[0])
                $scope.productArray = d.data;
            })
        }
    });