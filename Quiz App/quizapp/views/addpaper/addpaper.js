/**
 * Created by Muhammad on 11/8/2015.
 */
/**
 * Created by Muhammad on 10/21/2015.
 */

angular.module("myApp")

    .controller("AddpaperController",function(firebaseUrl,$firebaseArray,$rootScope)
    {

        var vm = this;
        var ref = new Firebase(firebaseUrl+"Data/Papers");

        vm.questionDiv = true;




        vm.createNewPaper = function(paperName)
        {
            var pushedData = ref.push(
                {
                    paperName : paperName
                },function(error)
                {
                    if(error)
                    {
                        console.log("Paper not created : ",error);
                    }
                    else
                    {
                        console.log("Paper Created Successfully with Id is : ",pushedData.key());
                    }
                });
            if(pushedData.key() != "")
            {
                vm.paper = "";
                vm.questionDiv = false;
            }
        };

    });