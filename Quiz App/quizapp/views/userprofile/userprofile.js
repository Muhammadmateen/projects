/**
 * Created by Muhammad on 11/8/2015.
 */


angular.module("myApp")

    .controller("UserprofileController",function(firebaseUrl,$document,$firebaseArray,$sessionStorage)
    {

        var vm = this;
        var userId = $sessionStorage.get('userId');
        var profileRef = new Firebase(firebaseUrl+"Data/Students/"+userId);
        vm.profileDetails = $firebaseArray(profileRef);
        vm.loader = true;

        $document.ready(function()
        {

            if((userId == "" || userId == undefined))
            {
                redirect.redirectCall('login');
            }

        });

        vm.profileDetails.$loaded().then(function()
            {
                vm.loader = false;
            });

    })