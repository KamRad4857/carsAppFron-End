var address = "http://localhost:8080/";
var addTitle = "Add Action";
var editTitle = "Add Action";
var addMessage = " added to database.";
var editMessage = "You edited the item ";
var app = angular.module("carsApp", ["ngRoute"]).controller("carsCtrl",
    function ($scope, $http, $location, $timeout, $routeParams, $filter, ColorsData, ModelsData, BrandsData, CarsData) {
        $scope.editedCar = {};
        $scope.editedModel = {};
        $scope.editedBrand = {};
        $scope.editedColor = {};
        $scope.editedItem = {};
        $scope.addedCar = {
            name: '',
            price: 0,
            modelId: 0,
            colorId: 0
        };
        $scope.formul = {};
        CarsData.getCarsData().success(function (data) {
            if ($routeParams.id) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == $routeParams.id) {
                        $scope.editedCar = data[i];
                    }
                }
            }
            $scope.cars = data;
        });
        BrandsData.getBrandsData().success(function (data) {
            $scope.brands = data;
            for (var i = 0; i < $scope.brands.length; i++) {
                if ($scope.brands[i].id == $routeParams.id) {
                    $scope.editedBrand = $scope.brands[i];
                }
            }
        });
        ModelsData.getModelsData().success(function (data) {
            $scope.models = data;
            for (var i = 0; i < $scope.models.length; i++) {
                if ($scope.models[i].id == $routeParams.id) {
                    $scope.editedModel = $scope.models[i];
                }
            }
        });
        ColorsData.getColorsData().success(function (data) {
            $scope.colors = data;
            if ($routeParams.id) {
                console.log($scope.colors);
                for (var i = 0; i < $scope.colors.length; i++) {
                    if ($scope.colors[i].id == $routeParams.id) {
                        $scope.editedColor = $scope.colors[i];
                    }
                }
            }
        });
        $scope.addCar = function (addedCar) {
            var tempCar = {
                "name": addedCar.name,
                "price": addedCar.price,
                "model": addedCar.model.id,
                "color": addedCar.color.id
            };
            $http.post(address + "car/add/", tempCar).success(function () {
                confModal(addedCar.name+addMessage, addTitle);
                $location.path("/car/");
            });
        };
        $scope.editCar = function () {
            $http.put(address + "car/edit/" + $scope.editedCar.id, $scope.editedCar).success(function () {
                confModal(editMessage+$scope.editedCar.id, editTitle);
                $location.path("/car/");
            });
        };
        $scope.removeCar = function (id) {
            confirmationBox(function () {
                $http.delete(address + "car/delete/" + id).success(function () {
                    var carToRemove = ($filter('filter')($scope.cars, function (d) {
                        return d.id == id;
                    })[0]);
                    var indexOfElementToRemove = $scope.cars.indexOf(carToRemove);
                    if (indexOfElementToRemove > -1) {
                        $scope.cars.splice(indexOfElementToRemove, 1);
                    }
                });
            }, function () {
                console.log("Didn't delete color: " + id);
            }, "Do you really want to delete color: " + id, "Yes, Delete", "Cancel");
        };
        $scope.addColor = function () {
            var tempColorName = $scope.newColorName;
            var tempColor = {"name": tempColorName};
            $scope.master = angular.copy(tempColor);
            $http.post(address + "color/add/", tempColor).success(function () {
                confModal(tempColorName+addMessage, addTitle);
                $location.path("/color");
            });
        };
        $scope.editColor = function () {
            $http.put(address + "color/edit/" + $scope.editedColor.id, $scope.editedColor).then(function () {
                confModal(editMessage+$scope.editedColor.id, editTitle);
                $location.path("/color");
            });
        };
        $scope.removeColor = function (id) {
            confirmationBox(function () {
                $http.delete(address + "color/delete/" + id).success(function () {
                    $location.path("/color/");
                });
            }, function () {
                console.log("Didn't delete color: " + id);
            }, "Do you really want to delete color: " + id, "Yes, Delete", "Cancel");

        };
        $scope.addBrand = function () {
            var tempBrandName = $scope.newBrandName;
            var tempBrand = {"name": tempBrandName};
            $http.post(address + "brand/add/", tempBrand).success(function () {
                confModal(tempBrandName+addMessage, addTitle);
                $location.path("/brand/");
            });
        };
        $scope.editBrand = function () {
            $http.put(address + "brand/edit/" + $scope.editedBrand.id, $scope.editedBrand).success(function () {
                confModal(editMessage+$scope.editedBrand.id, editTitle);
                $location.path("/brand/");
            });
        };
        $scope.removeBrand = function (id) {
            confirmationBox(function () {
                $http.delete(address + "brand/delete/" + id).success(function () {
                    $location.path("/brand/");
                });
            }, function () {
                console.log("Didn't delete brand: " + id);
            }, "Do you really want to delete brand: " + id, "Yes, Delete", "Cancel");
        };
        $scope.addedModel = {
            name: '',
            brandId: 0
        };
        $scope.addModel = function (addedModel) {
            var tempModel = {"name": addedModel.name, brand: addedModel.brand.id};
            $http.post(address + "model/add/", tempModel).success(function () {
                confModal(addedModel.name+addMessage, addTitle);
                $location.path("/model");
            });
        };
        $scope.editModel = function () {
            $http.put(address + "model/edit/" + $scope.editedModel.id, $scope.editedModel).success(function () {
                confModal(editMessage+$scope.editedModel.id, editTitle);
                $location.path("/model/");
            });
        };
        $scope.removeModel = function (id) {
            confirmationBox(function () {
                $http.delete(address + "model/delete/" + id).success(function (response) {
                    console.log(response);
                    var modelToRemove = ($filter('filter')($scope.models, function (d) {
                        return d.id == id;
                    })[0]);
                    var indexOfElementToRemove = $scope.models.indexOf(modelToRemove);
                    if (indexOfElementToRemove > -1) {
                        $scope.models.splice(indexOfElementToRemove, 1);
                    }
                });
            }, function () {
                console.log("Didn't delete model: " + id);
            }, "Do you really want to delete model: " + id, "Yes, Delete", "Cancel");

        }
    });

app.factory('ColorsData', ['$http', function ($http) {
    return {
        getColorsData: function () {
            return $http.get(address + "color").success(function (response) {
                return response.data;
            });
        }
    };
}]);

app.factory('BrandsData', ['$http', function ($http) {
    return {
        getBrandsData: function () {
            return $http.get(address + "brand").success(function (response) {
                return response.data;
            });
        }
    };
}]);

app.factory('ModelsData', ['$http', function ($http) {
    return {
        getModelsData: function () {
            return $http.get(address + "model").success(function (response) {
                return response.data;
            });
        }
    };
}]);

app.factory('CarsData', ['$http', function ($http) {
    return {
        getCarsData: function () {
            return $http.get(address + "car").success(function (response) {
                return response.data;
            });
        }
    };
}]);

function confirmationBox(successCallback, failCallback, confirmationText, confirmOption, cancelOption) {
    window.jQuery("#myModal").modal();
    window.jQuery("#modalInfo").html(confirmationText);
    window.jQuery("#btnDelete").html(confirmOption);
    window.jQuery("#btnCancel").html(cancelOption);
    window.jQuery("#btnDelete").on("click", function (e) {
        e.preventDefault();
        successCallback();
    });
    window.jQuery("#btnCancel").on("click", function (e) {
        e.preventDefault();
        failCallback();
    });
}
function confModal(confInfo, confTitle) {
    window.jQuery("#confModal").modal();
    window.jQuery("#modalConfirm").html(confInfo);
    window.jQuery("#modalTitle").html(confTitle);
}
