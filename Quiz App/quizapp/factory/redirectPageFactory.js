/**
 * Created by Muhammad on 11/8/2015.
 */
/**
 * Created by Muhammad on 11/3/2015.
 */


angular.module("myApp")

    .factory("redirect",function($state,$mdDialog)
    {
        var factory = {};

        factory.redirectCall =  function(val)
        {
            $state.go(val);
        };


        factory.alertDialog = function(title,content)
        {
            var alert = $mdDialog.alert({
                title: title,
                content: content,
                ok: 'Close'
            });
            $mdDialog
                .show( alert )
                .finally(function() {
                    alert = undefined;
                });
        }


        return factory;
    });