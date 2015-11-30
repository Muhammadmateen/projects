/**
 * Created by Muhammad on 11/8/2015.
 */
/**
 * Created by Muhammad on 10/21/2015.
 */

angular.module("myApp")

    .controller("AddquestionsController",function(firebaseUrl,$firebaseArray)
    {
        var vm = this;
        vm.hideTxtbox = true;
        var ref = new Firebase(firebaseUrl+"Data/Papers");
        vm.papers = $firebaseArray(ref);
        vm.papers.$loaded()
            .then(function(data)
            {
                console.log("Data get sucessfully : ",vm.papers);
                vm.allPapers = function(papr)
                {
                    vm.hideTxtbox = false;
                };


            })
            .catch(function(error)
            {
                console.log("Error Occurs : ",error);
            })

        vm.addQuestion = function(id)
        {
            //alert("Key : "+id);
            var childRef = new Firebase(firebaseUrl+"Data/Papers/"+id+"/Questions");
            var pushedQuestions = childRef.push(
                {
                    Question:vm.question,
                    A:vm.optA,
                    B:vm.optB,
                    C:vm.optC,
                    D:vm.optD,
                    Answer:vm.selectedAnswer

                },function(error)
                {
                    if(error)
                    {
                        console.log("Question not added : ",error);
                    }
                    else
                    {
                        console.log("question added sussfully Uid is : ",pushedQuestions.key());
                    }
                });
            vm.setTxtboxNull();
        };


        vm.setTxtboxNull = function()
        {
            vm.question = "";
            vm.optA = "";
            vm.optB = "";
            vm.optC = "";
            vm.optD = "";
            vm.selectedAnswer = "";

        };

    });