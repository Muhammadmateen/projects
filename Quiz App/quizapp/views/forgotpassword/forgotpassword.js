/**
 * Created by Muhammad on 11/19/2015.
 */



angular.module("myApp")

    .controller("forgotpassController",function(firebaseUrl,$mdToast,$timeout,$mdDialog)
    {
        var vm = this;
        vm.loader = false;

        vm.resetPass = function(emailId,ev)
        {
            vm.loader = true;
            var ref = new Firebase(firebaseUrl);
            ref.resetPassword({
                email : emailId
            }, function(error) {
                if (error === null) {


                    var alert = $mdDialog.alert({
                        title: 'Sent Successfully',
                        content: "Temporary Password email sent successfully.Please check you'r email ",
                        ok: 'Close'
                    });
                    $mdDialog
                        .show( alert )
                        .finally(function() {
                            alert = undefined;
                            vm.email = undefined;
                        });

                } else {


                    var alert = $mdDialog.alert({
                        title: 'Sent Failed',
                        content: 'Email address you specified is not exit.',
                        ok: 'Close'
                    });
                    $mdDialog
                        .show( alert )
                        .finally(function() {
                            alert = undefined;
                            vm.email = undefined;
                        });

                    $timeout(function()
                    {
                        vm.email = "";
                    },0);
                }
                vm.loader = false;
            });
        };




    })
