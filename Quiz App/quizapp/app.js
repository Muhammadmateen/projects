

var app = angular.module("myApp",['ui.router','ngMaterial','firebase','ngMdIcons','swxSessionStorage']);

app.constant("firebaseUrl","https://quizzapp.firebaseio.com/");

app.config(function($stateProvider,$urlRouterProvider)
{
    $urlRouterProvider.otherwise('login');


    $stateProvider.state('login',{
        url:'/login',
        templateUrl:'./views/login/login.html',
        controller:'LoginController',
        controllerAs:'ctrl'
        })

        .state('registration',{
            url:'/registration',
            templateUrl:'./views/registration/registration.html',
            controller:'RegistrationController',
            controllerAs:'ctrl'
        })

        .state('forgotpassword',{
            url:'/ForgotPassword',
            templateUrl:'views/forgotpassword/forgotpassword.html',
            controller:'forgotpassController',
            controllerAs:'ctrl'
        })

        .state('dashboard',{
            url:'/dashboard',
            templateUrl:'./views/dashboard/dashboard.html',
            controller:'DashboardController',
            controllerAs:'ctrl'

        })

        .state('dashboard.selectpaper',{
            url:'/selectpaper',
            templateUrl:'./views/selectpaper/selectpaper.html',
            controller:'SelectpaperController',
            controllerAs:'ctrl'
        })

        .state('dashboard.paper',{
            url:'/paper/:paper/:id',
            templateUrl:'./views/paper/paper.html',
            controller:'PaperController',
            controllerAs:'ctrl'
        })

        /*.state('user',{
            url:'/USER',
            views:{
                "result":{
                    templateUrl:'./views/result/result.html',
                    controller:'ResultController',
                    controllerAs:'ctrlR'
                },
                "profile":{
                    templateUrl:'./views/userprofile/userprofile.html',
                    controller:'UserprofileController',
                    controllerAs:'ctrlP'
                }
            }

        })*/

        .state('dashboard.userprofile',{
            url:'/userprofile',
            templateUrl:'./views/userprofile/userprofile.html',
            controller:'UserprofileController',
            controllerAs:'ctrl'
        })

        .state('dashboard.result',{
            url:'/result',
            templateUrl:'./views/result/result.html',
            controller:'ResultController',
            controllerAs:'ctrl'
        })

        .state('dashboard.changePass',{
            url:'/ChangePassword',
            templateUrl:'./views/changePassword/changePassword.html',
            controller:'ChangePasswordController',
            controllerAs:'ctrl'
        })


        //Admin
        .state('addpaper',{
            url:'/createNewPaper',
            templateUrl:'./views/addpaper/addpaper.html',
            controller:'AddpaperController',
            controllerAs:'ctrl'
        })

        .state('addquestions',{
            url:'/addquestions',
            templateUrl:'./views/addquestions/addquestions.html',
            controller:'AddquestionsController',
            controllerAs:'ctrl'
        })
})