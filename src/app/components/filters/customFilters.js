(function() {
    'use strict';

    angular.module('app')
        .filter('extractDataSeries', function() {
            return function(input) {
                if (typeof(input)!=='undefined')
                    return input.map(function(item) {
                        return item[1];
                    })
            }
        })
        .filter('convertUnits', function() {
            return function(input, factor) {
                if (typeof(input)!=='undefined')
                    return input * factor;
            }
        })
        .filter('min', function() {
            return function(input) {
                if (typeof(input)!=='undefined')
                    return Math.min.apply(null, input);
            }
        })
        .filter('max', function() {
            return function(input) {
                if (typeof(input)!=='undefined')
                    return Math.max.apply(null, input);
            }
        })
        .filter('total', function() {
            return function(input) {
                if (typeof(input)!=='undefined') {
                    var total = 0;
                    for (var i = input.length - 1; i >= 0; i--) {
                        total += input[i];
                    }
                    return total;
                }
            }
        })
        .filter('mean', function() {
            return function(input) {
                if (typeof(input)!=='undefined') {
                    var total = 0;
                    for (var i = input.length - 1; i >= 0; i--) {
                        total += input[i];
                    }
                    return total/input.length;
                }
            }
        })
        .filter('sigFigs', function() {
            return function(input, sig) {
                if (typeof(input)!=='undefined') {
                    var mult = Math.pow(10,
                    sig - Math.floor(Math.log(input) / Math.LN10) - 1);
                    return Math.round(input * mult) / mult;
                }
            }
        })
        .filter('summary', ['$filter', function($filter) {
            return function(input, func) {
                return $filter(func)(input);
            }
        }])

})();

