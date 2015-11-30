/**
 * Created by Muhammad on 10/21/2015.
 */

angular.module("myApp")

    .controller("LoginController",function(firebaseUrl,$sessionStorage,$document,$timeout,redirect,$state,$mdToast)
    {

        var vm = this;
        var ref = new Firebase(firebaseUrl);
        var userId = $sessionStorage.get('userId');
        var redirectValue = 'dashboard';

        //When page is ready
        $document.ready(function()
        {

            if(userId != "" && userId != undefined && userId != null)
            {
                redirect.redirectCall(redirectValue);
            }

        });




        //Login Function
        vm.login = function(email,pass)
        {
            vm.loader = true;
            ref.authWithPassword({
                email    :email,
                password :pass
            },function(error,authData)
            {
                if(error)
                {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Login Failed : Email address and password is incorrect')
                            .position(vm.getToastPosition())
                            .hideDelay(3000)
                    );
                    $timeout(function()
                    {
                        vm.pass = "";
                        vm.loader = false;
                    },0);
                }
                else
                {
                    $sessionStorage.put('userId', authData.uid);
                    $sessionStorage.put('userEmail',authData.password.email);
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Login Successfully')
                            .position(vm.getToastPosition())
                            .hideDelay(3000)
                    );

                    $state.go(redirectValue);
                }
            });

        };


        //Set the position of Toast
        vm.toastPosition = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        //get the position of Toast
        vm.getToastPosition = function() {
            return Object.keys(vm.toastPosition)
                .filter(function(pos) { return vm.toastPosition[pos]; })
                .join(' ');
        };


    });