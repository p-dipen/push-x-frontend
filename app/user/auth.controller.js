(function () {
  angular.module("boilerplate").controller("SignController", SignController);

  SignController.$inject = [
    "LocalStorage",
    "QueryService",
    "$scope",
    "$rootScope",
    "$state"
  ];

  function SignController(
    LocalStorage,
    QueryService,
    $scope,
    $rootScope,
    $state
  ) {
    var self = this;
    $scope.registrationComplete = false;
    $scope.error = false;
    $scope.errormsg = "";
    $scope.userdetail = {
      firstname: "",
      lastname: "",
      email: "",
      number: ""
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
        QueryService.query(
          "POST",
          "public/register",
          "",
          $scope.userdetail
        ).then(function (response) {
          $rootScope.loader = false;
          if (response.data.success == true) {
            $scope.registrationComplete = true;
          } else {
            $rootScope.loader = false;
            $scope.error = true;
            $scope.errormsg = response.data.msg;
          }
          console.log(response);
        });
      }
    };
    $scope.signValidat = {
      rules: {
        email: { required: true, email: true },
        firstname: { required: true },
        lastname: { required: true },
        phonenumber: {
          minlength: 10,
          maxlength: 10,
          number: true
        }
      }
    };
  }
})();
