/**
 * Created by Muhammad on 11/8/2015.
 */

angular.module("myApp")


    .controller("PaperController",function(firebaseUrl,$interval,$document,$sessionStorage,$firebaseArray,$stateParams,redirect)
    {
        var vm = this;
        var paperName = $stateParams.paper;
        var paperId = $stateParams.id;
        var ref = new Firebase(firebaseUrl+"Data/Papers/"+paperId+"/Questions");
        vm.questionPaper = $firebaseArray(ref);
        var userId = $sessionStorage.get('userId');
        vm.loader = true;
        vm.showQuestions = false;
        vm.showResult = false;


        $document.ready(function()
        {
            if((userId == "" || userId == undefined))
            {
                redirect.redirectCall('login');
            }
        });

        vm.questionPaper.$loaded().then(function()
            {
                vm.loader = false;
                vm.showQuestions = true;
            }
        );

        vm.questionNo = 0;
        vm.totalMarks = 0;
        vm.result;


        vm.nextQuestion = function()
        {
            if((vm.questionNo+1) == vm.questionPaper.length )
            {
                vm.endQuiz();
                vm.stop();
            }
            else if(vm.option == vm.questionPaper[vm.questionNo].Answer)
            {
                vm.totalMarks++;
                vm.questionNo++;
                vm.option="";
            }
            else
            {
                vm.questionNo++;
                vm.option="";
            }
        }


        //
        vm.endQuiz = function()
        {
            vm.showResult = true;
            vm.showQuestions = false;
            vm.result = ((vm.totalMarks*100)/vm.questionPaper.length);
            var resultRef = new Firebase(firebaseUrl+"Data/Results/"+userId+"/"+paperName);
            resultRef.set(
                {
                    /*paperName : paperName,*/
                    percentage : vm.result
                }
            );


        };




        //Time function in paper controller
        vm.min = 1;
        vm.sec = 60;
        var checkTime = function()
        {
            if(vm.sec == 0)
            {
                if(vm.min == 0)
                {
                    vm.endQuiz();
                    vm.stop();
                }
                else
                {
                    vm.sec = 60;
                    vm.sec--;
                    vm.min--;
                }
            }
            else
            {
                vm.sec--;

            }
        }

        var promise = $interval(checkTime,1000);

        vm.stop = function() {
            $interval.cancel(promise);
        };


    });


