/**
 * Created by Muhammad on 10/30/2015.
 */
angular.module("myApp")

    .controller("SelectpaperController",function(firebaseUrl,$firebaseArray,$sessionStorage,$state,$document,redirect)
    {
        var vm = this;
        var ref = new Firebase(firebaseUrl+"Data/Papers");
        var userId = $sessionStorage.get('userId');
        vm.allPapers = $firebaseArray(ref);

        vm.formShow = false;

        $document.ready(function()
        {

            if((userId == "" || userId == undefined))
            {
                redirect.redirectCall('login');
            }

        });

        vm.allPapers.$loaded().then(function()
        {
            vm.formShow = true;
        });



        vm.startQuizz = function(id)
        {
            for(var i =0; i < vm.allPapers.length;i++)
            {
                if(vm.paperName == vm.allPapers[i].paperName)
                {
                    vm.paperId = vm.allPapers[i].$id;
                    $state.go('dashboard.paper',{paper:vm.paperName,id:vm.paperId});
                    break;
                }
            }
        }


    });