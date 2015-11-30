/**
 * Created by Muhammad on 10/28/2015.
 */
angular.module("myApp")

    .controller("RegistrationController",function(firebaseUrl,redirect,$timeout,$mdDialog,$mdToast)
    {
        var vm = this;
        var ref = new Firebase(firebaseUrl);
        vm.loader = false;



        vm.addStdRecord = function() {
            vm.loader = true;
            ref.createUser({
                email: vm.email,
                password: vm.pass
            }, function (error, userData) {
                if (error) {
                    vm.loader = false;
                    redirect.alertDialog("Error",""+error);
                } else {
                    var childRef = ref.child("Data/Students/"+userData.uid);
                    childRef.set(
                        {
                            studentName : vm.stdName,
                            fatherName : vm.fatherName,
                            contactNo : vm.contactNo,
                            address : vm.address,
                            institute : vm.institute
                        },function(error)
                        {
                            if(error)
                            {
                                vm.loader = false;
                                redirect.alertDialog("Error",error);
                            }
                            else
                            {
                                vm.loader = false;
                                redirect.alertDialog("Successful","Successfully created user account");
                                redirect.redirectCall("login");

                            }

                        });

                }

            });


        };



    });