(function() {

    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController($scope, $http) {
        var vm = this;
        
        $scope.selectedState = {};
        $scope.states = [
            { id: 0, name: 'Acre' },
            { id: 1, name: 'Alagoas' },
            { id: 2, name: 'Amapa' },
            { id: 3, name: 'Amazonas' },
            { id: 4, name: 'Bahia' },
            { id: 5, name: 'Ceara' },
            { id: 6, name: 'Distrito Federal' },
            { id: 7, name: 'Espirito Santo' },
            { id: 8, name: 'Goias' },
            { id: 9, name: 'Maranhao' },
            { id: 10, name: 'Mato Grosso' },
            { id: 11, name: 'Mato Grosso Do Sul' },
            { id: 12, name: 'Minas Gerais' },
            { id: 13, name: 'Para' },
            { id: 14, name: 'Paraiba' },
            { id: 15, name: 'Parana' },
            { id: 16, name: 'Pernambuco' },
            { id: 17, name: 'Piaui' },
            { id: 18, name: 'Rio De Janeiro' },
            { id: 19, name: 'Rio Grande Do Norte' },
            { id: 20, name: 'Rio Grande Do Sul' },
            { id: 21, name: 'Rondonia' },
            { id: 22, name: 'Roraima' },
            { id: 23, name: 'Santa Catarina' },
            { id: 24, name: 'Sao Paulo' },
            { id: 25, name: 'Sergipe' },
            { id: 26, name: 'Tocantins' }
        ];
        $scope.selectedFuel = {};
        $scope.fuelTypes = [
            { id: 0, name: 'Gasolina' },
            { id: 1, name: 'Etanol' },
            { id: 2, name: 'GNV' },
            { id: 3, name: 'Diesel' },
            { id: 4, name: 'Diesel S10' },
            { id: 5, name: 'GLP' }
        ];

        $scope.jsonStates = [];
        $scope.tableCityStatatistics = [];
        $scope.callAPI = function() {
            $http.get('http://localhost:3005/api/v1/prices')
            .then(function(response) {
                // API Call succeded
                $scope.jsonStates = response.data;
                $scope.responseStatusMessage = 'Success on calling the API!!';
                var tableState = $scope.jsonStates.filter(function (currentState) {
                    return (currentState.name === $scope.selectedState.name);
                });
                $scope.tableCityStatatistics = [];
                tableState[0].cities.forEach(function (currentCity) {
                    var cityStatistic = {
                        name: '',
                        statistic: {}
                    }
                    var statistic = currentCity.statistics.filter(function(currentStatistic) {
                        return (currentStatistic.fuel_type === $scope.selectedFuel.name);
                    });

                    cityStatistic.name = currentCity.name;
                    cityStatistic.statistic = statistic[0];
                    $scope.tableCityStatatistics.push(cityStatistic);
                });
            }, function(response) {
                // Handling errors
                $scope.responseStatusMessage = 'Error on calling the API!!';
            });
        };

        $scope.updateFilter = function() {
            var tableState = $scope.jsonStates.filter(function (currentState) {
                return (currentState.name === $scope.selectedState.name);
            });
            $scope.tableCityStatatistics = [];
            tableState[0].cities.forEach(function (currentCity) {
                var cityStatistic = {
                    name: '',
                    statistic: {}
                }
                var statistic = currentCity.statistics.filter(function(currentStatistic) {
                    return (currentStatistic.fuel_type === $scope.selectedFuel.name);
                });

                cityStatistic.name = currentCity.name;
                cityStatistic.statistic = statistic[0];
                $scope.tableCityStatatistics.push(cityStatistic);
            });
            $scope.responseStatusMessage = 'Update Table!!';
        };
    }

})();
