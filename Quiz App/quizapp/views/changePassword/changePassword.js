/**
 * Created by Muhammad on 11/25/2015.
 */



angular.module("myApp")

    .controller("ChangePasswordController",function($mdDialog,$document,firebaseUrl,$sessionStorage,redirect)
    {

        var vm = this;
        var userId = $sessionStorage.get("userId");
        var userEmail = $sessionStorage.get('userEmail');
        vm.loader = false;


        $document.ready(function()
        {

            if((userId == "" || userId == undefined))
            {
                redirect.redirectCall('login');
            }

        });

        vm.changePassword = function(ev,b,c)
        {


            var confirm = $mdDialog.confirm(
                {
                    title : ('Change Password'),
                    content: ('Do you want to change your password?'),
                    targetEvent : (ev),
                    ok : ('Yes'),
                    cancel : ('No')
                })
                $mdDialog.show(confirm).then(function() {

                    vm.loader = true;
                    var ref = new Firebase(firebaseUrl);
                    ref.changePassword({
                        email       : userEmail,
                        oldPassword : vm.oldPass,
                        newPassword : vm.newPass
                    }, function(error) {
                        if (error === null) {
                            vm.loader = false;
                            redirect.alertDialog('Successful','Password Changed Successfully');

                        } else {
                            vm.loader = false;
                            redirect.alertDialog('Error','Error changing password:'+error);
                            vm.oldPass = "";
                            vm.newPass = "";
                        }
                    });


                }, function() {

                });





        };





    });

