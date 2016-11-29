(function(){
  'use strict';

  angular.module('app')
        .service('chartsService', [
        '$q', 'quantitiesService',
      chartsService
  ]);

  function chartsService($q, quantitiesService){
    
    return{

      series: {
          key: "Quantity" ,
          bar: true,
          values: []
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
              //valueFormat: function(d){
                      //return d3.format(',.1f')(d);
              //},
              //duration: 100,
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
          // subtitle: {
          //     enable: true,
          //     text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
          //     css: {
          //         'text-align': 'center',
          //         'margin': '10px 13px 0px 7px'
          //     }
          // },
          // caption: {
          //     enable: true,
          //     html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
          //     css: {
          //         'text-align': 'justify',
          //         'margin': '10px 13px 0px 7px'
          //     }
          // }
      },

      clearWeatherIcons: function() {
        d3.selectAll('image').each(function(icon) {
          d3.select(this).remove();
        })
      },

      addWeatherIcons: function(chartSeries) {

        var weatherIcons = quantitiesService.weatherIcons;
        
        var count = 0;
        d3.selectAll('.nv-bar').each(function(bar){

          var iconClass = chartSeries[0].values[count][2];

          var b = d3.select(this);

          var bars = d3.select('.nv-bars');

          // Remove previous labels if there is any
          b.selectAll('text').remove(); 
          // g.selectAll('.nv-bar').each(function(bar){
          // var b = d3.select(this);
          var barWidth = b.attr('width');
          var barHeight = b.attr('height');

          bars.append('image')
            // Transforms shift the origin point then the x and y of the bar
            // is altered by this transform. In order to align the labels
            // we need to apply this transform to those.
            .attr('transform', b.attr('transform'))
            // .text(label)
            .attr('y', function(){
              // Center label vertically
              var height = b[0][0].getBBox().height;
              
              return parseFloat(b.attr('y')) -60; // 15 is the label's margin from the top of bar
            })
            .attr('x', function(){
              // Center label horizontally
              var width = b[0][0].getBBox().width;
              console.log(b.attr('transform'), width);
              // return parseFloat(width / 2);
              return 0;
            })

            .attr('xlink:href', '/assets/images/weather-icons/' + weatherIcons[iconClass])
            
            .attr('class', 'icon icon-' + iconClass);

          // });
          count++;

        });

      }
 
    };

  }
  
})();
