(function(){
  'use strict';

  angular.module('app')
        .service('chartsService', [
        '$q', 'quantitiesService',
      chartsService
  ]);

  function chartsService($q, quantitiesService){

    return{

      minHeight: 150,

      series: {
          key: "Quantity" ,
          bar: true,
          values: []
      },

      discreteBarChartOptions: {

        chart: {
            type: 'discreteBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showValues: true,
            valueFormat: function(d){
                return d3.format('.3r')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'Site'
            },
            yAxis: {
                axisLabel: 'Output (kWh)',
                axisLabelDistance: -10,
                tickFormat: function(d){
                    return d3.format('.3r')(d);
                },
            }
        },
        title: {
            enable: true,
            text: 'PV Output per site'
        }

      },

      lineChartOptions: {

          chart: {

              type: 'lineChart',
              height: 450,
              margin : {
                  top: 20,
                  right: 20,
                  bottom: 40,
                  left: 55
              },
              x: function(d){ return d[0]; },
              y: function(d){ return d[1]; },
              useInteractiveGuideline: true,
              dispatch: {
                  stateChange: function(e){},
                  changeState: function(e){},
                  tooltipShow: function(e){},
                  tooltipHide: function(e){}
              },
              xAxis: {
                  axisLabel: 'Date',
                  tickFormat: function(d){
                      // return d3.time.format('%x')(new Date(d))
                      return moment(d,'x').format('D/M/YY'); //Works!
                  }
              },
              yAxis: {
                  axisLabel: 'Output (kWh)',
                  axisLabelDistance: -10,
                  tickFormat: function(d){
                      return d3.format('.3r')(d);
                  },
              },
              forceY: [0] // always show 0 on the line chart
          },
          title: {
              enable: true,
              text: 'PV output over time'
          }

      },

      historicalBarChartOptions: {

          chart: {
              type: 'historicalBarChart',
              height: 450,
              margin : {
                  top: 20,
                  right: 60,
                  bottom: 70,
                  left: 55
              },
              showValues: true,
              x: function(d){
                      if(typeof d[0] !== 'undefined')
                          return d[0];
                      else
                          return 'None';
                  },
              y: function(d){
                      if(typeof d[1] !== 'undefined')
                          return d[1];
                      else
                          return 0;
                   },
              useInteractiveGuideline: false,
              padData: true,
              clipEdge: true,
              noData: 'Loading...',
              xAxis: {
                  axisLabel: 'Time',
                  tickFormat: function(d) {
                      return moment(d,'x').format('D/M/YY');
                  },
                  rotateLabels: 30,
                  axisLabelDistance: -10 //leaves room for unit
              },
              yAxis: {
                  axisLabel: '',
                  tickFormat: function(d){
                      return d3.format('.3r')(d);
                  },
                  axisLabelDistance: -10 //leaves room for unit
              },
              // To use the below tooltip definition, switch useInteractiveGuideline to false.
              tooltip: {
                  keyFormatter: function(d) {
                      // return d3.time.format('%x')(new Date(d)); //Breaks tooltip.
                      return moment(d,'x').format('D/M/YY'); //Works!
                  }
              },
              zoom: {
                   enabled: false,
                   scaleExtent: [1, 10],
                   useFixedDomain: false,
                   useNiceScale: false,
                   horizontalOff: false,
                   verticalOff: true,
                   unzoomEventType: 'dblclick.zoom'
              }
          },
          title: {
              enable: true,
              text: ''
          }
      },

      clearWeatherIcons: function() {
        d3.selectAll('image').each(function(icon) {
          d3.select(this).remove();
        })
      },

      addWeatherIcons: function(chartSeries) {

        var weatherIcons = quantitiesService.weatherIcons;
        var weatherIconsDrawThreshold = quantitiesService.weatherIconsDrawThreshold;

        var bars = d3.select('.nv-bars');

        var plotArea = d3.select('.nv-barsWrap');
        var plotHeight = plotArea.node().getBBox().height;

        var count = 0;
        d3.selectAll('.nv-bar').each(function(bar){

          var iconClass = chartSeries[0].values[count][2];

          if(typeof iconClass !== "undefined") {

            var b = d3.select(this);
            var barWidth = b.attr('width');
            var barHeight = b.attr('height');
            var barY = b.attr('y');

            var iconWidth = Math.ceil(barWidth * 1.5);

            if(iconWidth >= weatherIconsDrawThreshold) {
              bars.append('image')
                .attr('transform', b.attr('transform'))
                .attr('y', function() {
                  var naturalY = barY - (iconWidth * 0.1);
                  if (naturalY > (plotHeight - (iconWidth * 0.8))) {
                    return plotHeight - iconWidth;
                  }
                  else {
                    return naturalY;
                  }
                })
                .attr('x', (barWidth/2)-(iconWidth/2))
                .attr('width', iconWidth)
                .attr('height', iconWidth)
                .attr('xlink:href', '/assets/images/weather-icons/' + weatherIcons[iconClass])
                .attr('class', 'icon icon-' + iconClass);
            }

          }

          count++;

        });

      }

    };

  }

})();
