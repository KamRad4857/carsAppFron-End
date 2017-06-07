app.config(function ($routeProvider) {
    $routeProvider
        .when("/car", {
            templateUrl: "templates/car.html"
        })
        .when("/brand", {
            templateUrl: "templates/brand.html"
        })
        .when("/model", {
            templateUrl: "templates/model.html"
        })
        .when("/color", {
            templateUrl: "templates/color.html"
        })
        .when("/addCar", {
            templateUrl: "templates/carAdd.html"
        })
        .when("/addBrand", {
            templateUrl: "templates/brandAdd.html"
        })
        .when("/addModel", {
            templateUrl: "templates/modelAdd.html"
        })
        .when("/addColor", {
            templateUrl: "templates/colorAdd.html"
        })
        .when("/car/edit/:id", {
            templateUrl: "templates/carEdit.html"
        })
        .when("/brand/edit/:id", {
            templateUrl: "templates/brandEdit.html"
        })
        .when("/model/edit/:id", {
            templateUrl: "templates/modelEdit.html"
        })
        .when("/color/edit/:id", {
            templateUrl: "templates/colorEdit.html"
        })
        .otherwise({
            redirectTo: "/car"
        });
});
