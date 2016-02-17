(function(){
  'use strict';

  angular.module('app')
        .service('toastService', [
        '$q', '$mdToast',
      toast
  ]);

  function toast($q, $mdToast){
    

    return {
      createPersistentToast : function(content) {
        return $mdToast.show(
          $mdToast.simple()
            .content(content)
            .hideDelay(false)
            .position('bottom right')
        );
      },
      hidePersistentToast: function(toast) {
        $mdToast.hide(toast);
      }
    };

  }
})();
