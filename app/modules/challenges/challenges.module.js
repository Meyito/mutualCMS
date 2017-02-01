(function () {
    'use strict';

    angular
        .module('app.challenges', [
            'ui.router',
            'ui.router.stateHelper',
            'ngTable',
            'ngFileUpload',
            'angular.filter'
        ])
        .config(routeConfig);

    routeConfig.$inject = [
        'stateHelperProvider'
    ];

    function routeConfig(stateHelperProvider) {

        stateHelperProvider.state({
            name: 'home.challenges',
            url: '/retos',
            templateUrl: 'app/modules/challenges/challenges.list.html',
            controller: 'ListChallengesController as challenges',
            data: {label: "Retos"},
            resolve: {
                challengesList: ['challengesService', function (challengesService) {
                    var params = {
                        include: 'category'
                    };
                    return challengesService.all({filter: JSON.stringify(params)});
                }]
            },
            children: [
                {
                    name: 'add',
                    url: '/agregar',
                    views: {
                        '@home': {
                            templateUrl: 'app/modules/challenges/challenges.add.html',
                            controller: 'AddChallengeController as addChallenge',
                        }
                    },
                    data: {label: "Agregar Reto"},
                    resolve: {
                        categories: ['categoriesService', function (categoriesService) {
                            return categoriesService.all();
                        }],
                        characteristics: ['characteristicsService', function (characteristicsService) {
                            return characteristicsService.all();
                        }],
                        selectedChallenge: function () {
                            return null;
                        },
                        images: ['challengesService', function (challengesService) {
                            return challengesService.getFiles("images");
                        }]
                    }
                },
                {
                    name: 'update',
                    url: '/:challengeID',
                    views: {
                        '@home': {
                            templateUrl: 'app/modules/challenges/challenges.add.html',
                            controller: 'AddChallengeController as addChallenge',
                        }
                    },
                    data: {label: "Actualizar Reto"},
                    resolve: {
                        categories: ['categoriesService', function (categoriesService) {
                            return categoriesService.all();
                        }],
                        characteristics: ['characteristicsService', function (characteristicsService) {
                            return characteristicsService.all();
                        }],
                        images: ['challengesService', function (challengesService) {
                            return challengesService.getFiles("images");
                        }],
                        selectedChallenge: ['challengesService', '$stateParams', function (challengesService, $stateParams) {
                            var query = {
                                include: [
                                    {
                                        relation: 'reviewQuestions',
                                        scope: {
                                            include: [
                                                {
                                                    relation: 'answers'
                                                }
                                            ]
                                        }
                                    }
                                ]
                            };
                            return challengesService.find($stateParams.challengeID, {filter: JSON.stringify(query)});
                        }]
                    }
                }
            ]
        });
    }

})();