"use strict";

angular.module('app', [])

    .controller('Ctrl', function($scope) {
        $scope.maps = [
            { center: {lat: 47.211, lng: -1.566}, zoom: 12 },
            { center: {lat: 37.423, lng: -122.086}, zoom: 9 }
        ];
    })

    .directive('gmaps', function factory($timeout) {
        return {
            restrict: 'EA',
            template: '<div class="gmaps"></div>',
            replace: true,
            scope: {
                zoom: '=zoom',
                center: '=center'
            },
            link: function postLink(scope, element, attrs) {

                var mapOptions = {
                    center: new google.maps.LatLng(scope.center.lat, scope.center.lng),
                    zoom: scope.zoom,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(element[0], mapOptions);

                scope.$watch('zoom', function (newValue) {
                    map.setZoom(parseInt(newValue));
                });

                scope.$watch('center', function (newValue) {
                    map.setCenter(new google.maps.LatLng(
                        parseFloat(newValue.lat),
                        parseFloat(newValue.lng))
                    );
                }, true);

                google.maps.event.addListener(map, 'zoom_changed', function () {
                    $timeout(function () {
                        scope.zoom = map.getZoom();
                    });
                });

                google.maps.event.addListener(map, 'center_changed', function () {
                    $timeout(function () {
                        scope.center = {
                            lat: map.getCenter().lat(),
                            lng: map.getCenter().lng()
                        };
                    });
                });

            }
        };
    });
