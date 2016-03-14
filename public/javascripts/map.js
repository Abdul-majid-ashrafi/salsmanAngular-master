/**
 * Created by Taimoor tariq on 3/14/2016.
 */
angular.module("App")

.controller("mapController",function($scope,$stateParams){
    $scope.lat =  $stateParams.lat*1;
    $scope.lng =  $stateParams.lng*1;



    angular.extend($scope, {
        center: {
            lat: $scope.lat,
            lng: $scope.lng,
            zoom: 20
        },
        defaults: {
            zoomAnimation: false,
            markerZoomAnimation: false,
            fadeAnimation: false
        },
        markers: {
            london: {
                lat: $scope.lat,
                lng: $scope.lng,
                message: "Salesman here!",
                focus: true,
                draggable: false
            }
        }
    });
})