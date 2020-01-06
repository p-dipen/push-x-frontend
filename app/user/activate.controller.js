(function () {
  angular
    .module("boilerplate")
    .controller("ActivateController", ActivateController);

  ActivateController.$inject = [
    "LocalStorage",
    "QueryService",
    "$scope",
    "$rootScope",
    "$state",
    "$location"
  ];

  function ActivateController(
    LocalStorage,
    QueryService,
    $scope,
    $rootScope,
    $state,
    $location
  ) {
    $rootScope.loader = true;
    $scope.activate = false;
    $scope.error = false;
    $scope.errormsg = "";
    $scope.userdetail = {
      activation: $state.params.activateCode,
      password: "",
      password_confirm: ""
    };
    QueryService.query("POST", "public/activate", "", $scope.userdetail).then(
      function (response) {
        console.log(response);
        $rootScope.loader = false;
        if (response.data.success == false) {
          $scope.error = true;
          $scope.errormsg = response.data.msg;
        }
        console.log(response);
      }
    );
    $scope.OnSubmit = function (form) {
      if (!form.$valid) {
        form.validate();
        return;
      }
      if (form.validate()) {
        $rootScope.loader = true;
        QueryService.query("PUT", "public/useractivate", "", $scope.userdetail).then(
          function (response) {
            $rootScope.loader = false;
            if (response.data.success == true) {
              LocalStorage.set('token', response.data.token);
              LocalStorage.set('user', response.data.userdetail.toString());
              $location.path('dashboard')
            } else {
              $scope.error = true;
              $scope.errormsg = response.data.msg;
            }
            console.log(response);
          }
        );
      }
    };
    $scope.activateValidat = {
      rules: {
        password: {
          required: true,
          minlength: 6
        },
        password_confirm: {
          required: true,
          equalTo: "#password"
        }
      }
    };
  }
})();
