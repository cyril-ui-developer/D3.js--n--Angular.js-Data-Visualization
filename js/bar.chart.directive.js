


    angular.module("D3AngularVizApp")
// directive for bar chart

        .directive('barChart', function($document,$window){
        
         return{
              restrict:'EA',
              scope:{
                        data: '='
                    },
             
         link: function link(scope,el,attrs){
                  var el =el[0];
             
                 
               var chart = d3.select(el)
                          .append('svg')
                          .style('width', '100%').style('height', '100%');;

     
            
                   drawBarChart = function(data) {
                      chart.selectAll('*').remove();
                //var width = svg.style('width')
                 
           
                var margin = {top: 30, right: 50, bottom: 50, left: 100},
                   //  width = chart.style('width'),
                    width = chart.style('width'),
                     height = chart.style('height'),
                     height = parseInt(height),
                     width = parseInt(width);
                    
                    height = height - margin.top - margin.bottom,
                    width = width - margin.left - margin.right,
                    color = d3.scale.category20();
         
                var x = d3.scale.ordinal().rangeRoundBands([0, width], .05); //.range([0, chartWidth]);
                var y = d3.scale.linear().range([height, 0]);
                      
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .ticks(10);
                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(5);

                var svgGroup = chart.append("g")
                              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                //set a watch on he scope
                scope.$watch('data', function(data){

                    if(!data){ return }


                  x.domain(data[0].type.map(function(d) { return d.name }));
                  y.domain([0, d3.max(data[0].type, function(d) { return d.count; })]);

                    // x axis
                 svgGroup.append("g")
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis)
                      .append("text")
                      .style("text-anchor", "end")
                      .attr("transform", "rotate(0)" )
                      //.attr("dx", "em")
                     .attr("dx", "28em").attr("dy", "3em").text("Product Types");;

                    // yaxis
                  svgGroup.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                    .append("text")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 6)
                      .attr("dy", "-5.1em")
                      .style("text-anchor", "middle").text("Count");

                  svgGroup.selectAll("bar")
                      .data(data[0].type)
                    .enter().append("rect")
                      .style("fill", function(d){return color(x(d.name));})
                      .attr("x", function(d) { return x(d.name); })
                      .attr("width", x.rangeBand())
                      .attr("y", function(d) { return y(d.count); })
                      .attr("height", function(d) { return height - y(d.count); });

                        //var barWidth = x.rangeBand() / data[0].type.length;
               
                 
                           svgGroup.selectAll(".bartext")
                            .data(data[0].type)
                            .enter().append("text")
                            .attr("class", "bartext")
                            .attr("text-anchor", "middle")
                            .attr("fill", "#fff")
                            .attr("dy", "1.5em")
                            .attr("x", function(d) { return x(d.name) + x.rangeBand()/2; })
                            .attr("y", function(d) { return  y(d.count); })
                            .text(function (d,i){return (d.count) });
     
                }) // end of watch
                  } // end of drawgraph
              
                     drawBarChart()
                

        }, //end of link
           
                             template: '<div id="chart" class="chart-margin"> Product Type Bar Chart</div>',
                            controller:function( $scope){
                                    $window.onresize = function() {
                                        $scope.$apply(drawBarChart());
                        };
                            }
                 }
    })
    
    
    