(function() {
    'use strict';

    angular.module('app')
        .filter('extractDataSeries', function() {
            return function(input) {
                return input.map(function(item) {
                  return item[1];
                })

            }
        })
        .filter('min', function() {
            return function(input) {
                return Math.min.apply(null, input);
            }
        })
        .filter('max', function() {
            return function(input) {
                return Math.max.apply(null, input);
            }
        })
        .filter('total', function() {
            return function(input) {
                var total = 0;
                for (var i = input.length - 1; i >= 0; i--) {
                    total += input[i];
                }
                return total;
            }
        })
        .filter('mean', function() {
            return function(input) {
                var total = 0;
                for (var i = input.length - 1; i >= 0; i--) {
                    total += input[i];
                }
                return total/input.length;
            }
        })
        .filter('sigFigs', function() {
            return function(input, sig) {
                var mult = Math.pow(10,
                sig - Math.floor(Math.log(input) / Math.LN10) - 1);
                return Math.round(input * mult) / mult;
            }
        })




})();

