angular.module("App", ["ngMaterial","ui.router","firebase" ,"ngMdIcons","leaflet-directive"])


    .config(function ($urlRouterProvider,$stateProvider, $mdThemingProvider) {
        $stateProvider
            .state("loginAdmin",{
                url:"/loginAdmin",
                templateUrl:"templates/loginAdmin.html",
                controller: "loginCtrl"
            })
            .state("dashboard",{
                url:"/dashboard",
                isLoggedIn : true,
                templateUrl:"templates/dashboard.html",
                controller:  "AppCtrl",
                resolve:{
                    abc: function(){
                        if(!localStorage.getItem("toke")){
                            $state.go("loginAdmin")
                        }
                    }
                }
            })

        .state("signup",{
                url: "/sign_up",
                templateUrl: "templates/signup.html",
                controller: "signCtrl"
            })

        .state("dashboard.abc",{
                url: "/user",
                templateUrl: "templates/user.html",
                controller: "userSignUp"
            })
            .state("orderBooking",{
                url: "/booking_orders",
                templateUrl: "templates/orderBooking.html",
                controller: "AppCtrl"
            })
            .state("map",{
                url: "/location/:lat/:lng",
                templateUrl: "templates/map.html",
                controller: "mapController"
            })

        .state("dashboard.cba",{
                url: "/product",
                templateUrl: "templates/product.html",
                controller: "order"
            });


        $urlRouterProvider.otherwise("/loginAdmin")
    })
