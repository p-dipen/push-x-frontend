(function () {
  /**
   * Definition of the main app module and its dependencies
   */
  angular.module("boilerplate", ["ui.router", "ngValidate"]).config(config);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = [
    "$stateProvider", "$urlRouterProvider",
    "$locationProvider",
    "$httpProvider",
    "$compileProvider"
  ];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   *
   */
  function config(
    $stateProvider, $urlRouterProvider,
    $locationProvider,
    $httpProvider,
    $compileProvider
  ) {
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');
    // routes
    $stateProvider
      .state("base", {
        url: "/",
        templateUrl: "views/signup/login.html",
        controller: "SignInController",
        controllerAs: "signin"
      })
      .state("login", {
        url: "/login",
        templateUrl: "views/signup/login.html",
        controller: "SignInController",
        controllerAs: "signin"
      })
      .state("activate", {
        url: "/activate/:activateCode",
        templateUrl: "views/signup/activate.html",
        controller: "ActivateController",
        controllerAs: "activate"
      })
      .state("signup", {
        url: "/signup",
        templateUrl: "views/signup/signup.html",
        controller: "SignController",
        controllerAs: "sign"
      })
      .state("dashboard", {
        url: "/dashboard",
        templateUrl: "views/dashboard/home.html",
        controller: "DashboardController",
        controllerAs: "dash"
      })

    $httpProvider.interceptors.push("authInterceptor");
  }

  /**
   * You can intercept any request or response inside authInterceptor
   * or handle what should happend on 40x, 50x errors
   *
   */
  angular.module("boilerplate").factory("authInterceptor", authInterceptor);

  authInterceptor.$inject = ["$rootScope", "$q", "LocalStorage", "$location"];

  function authInterceptor($rootScope, $q, LocalStorage, $location) {
    return {
      // intercept every request
      request: function (config) {
        config.headers = config.headers || {};
        return config;
      },

      // Catch 404 errors
      responseError: function (response) {
        if (response.status === 404) {
          $location.path("/");
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }
  angular.module("boilerplate").config(function ($validatorProvider) {
    $validatorProvider.setDefaults({
      errorElement: "span",
      errorClass: "text-danger"
    });
  });
  /**
   * Run block
   */
  angular.module("boilerplate").run(run);

  run.$inject = ["$rootScope", "$location"];

  function run($rootScope, $location) {
    // put here everything that you need to run on page load
    // $location.state("/signup");
    $rootScope.loaderrequest = false;
  }
})();
