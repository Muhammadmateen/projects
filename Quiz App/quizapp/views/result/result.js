/**
 * Created by Muhammad on 11/8/2015.
 */
/**
 * Created by Muhammad on 11/8/2015.
 */


angular.module("myApp")

    .controller("ResultController",function(firebaseUrl,redirect,$document,$sessionStorage,$firebaseArray)
    {

        var vm = this;
        var userId = $sessionStorage.get('userId');
        var ref = new Firebase(firebaseUrl+"Data/Results/"+userId);
        vm.result = $firebaseArray(ref);
        vm.loader = true;


        $document.ready(function()
        {
            if(userId == "" || userId == undefined)
            {
                redirect.redirectCall("login");
            }
        });

        vm.result.$loaded().then(function()
        {
            vm.loader = false;
        })



    })