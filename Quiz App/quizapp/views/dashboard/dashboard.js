/**
 * Created by Muhammad on 11/8/2015.
 */
/**
 * Created by Muhammad on 10/21/2015.
 */

angular.module("myApp")

    .controller("DashboardController",function(firebaseUrl,$sessionStorage,$firebaseArray,$stateParams,$document,redirect,$timeout)
    {
        var vm = this;
        var userId = $sessionStorage.get('userId');
        var ref = new Firebase(firebaseUrl+"Data/Students/"+userId);
        var stdDetails = $firebaseArray(ref);
        var redirectValue = "login";
        vm.loader = true;


        stdDetails.$loaded().then(function()
        {
            vm.stdName = stdDetails[4].$value;
        });

        $document.ready(function()
        {
            if((userId == "" || userId == undefined))
            {
                redirect.redirectCall(redirectValue);
            }
        });



        //logout user
        vm.logout = function()
        {
            vm.loader = false;

            $timeout(function()
            {
                $sessionStorage.remove('userId');
                redirect.redirectCall(redirectValue);
            },2000);

        };


        vm.userProfile = function()
        {
            redirect.redirectCall("dashboard.userprofile");
        }

        vm.changePassRoute = function()
        {
            redirect.redirectCall("dashboard.changePass");
        };



        //Drop down menu bar
        var originatorEv;
        vm.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

    });