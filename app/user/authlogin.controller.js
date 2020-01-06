(function () {
  angular
    .module("boilerplate")
    .controller("SignInController", SignInController);

  SignInController.$inject = [
    "LocalStorage",
    "QueryService",
    "$scope",
    "$rootScope",
    "$state",
    "$location"
  ];

  function SignInController(
    LocalStorage,
    QueryService,
    $scope,
    $rootScope,
    $state,
    $location
  ) {
    var self = this;
    $scope.error = false;
    $scope.errormsg = "";
    $scope.userdetail = {
      email: "",
      password: ""
    };
    $scope.refreshPage = function () {
      $state.reload();
    };
    $scope.OnSubmit = function (form) {
      if (!form.$valid) {
        form.validate();
        return;
      }
      if (form.validate()) {
        $rootScope.loader = true;
        QueryService.query("POST", "public/signin", "", $scope.userdetail).then(
          function (response) {
            $rootScope.loader = false;
            if (response.data.success == true) {
              LocalStorage.set('token', response.data.token);
              LocalStorage.set('user', response.data.user.toString());
              $location.path('dashboard')
            } else {
              $rootScope.loader = false;
              $scope.error = true;
              $scope.errormsg = response.data.msg;
            }
            console.log(response);
          }
        );
      }
    };
    $scope.signInValidat = {
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 6
        }
      }
    };
  }
})();
