
	angular.module("D3AngularVizApp")
        // directive for line chart
		
		.directive('lineChart', function($document,$window){
        
         return{
              restrict:'EA',
              scope:{
                        data: '='
                    },
             
         	  link: function link(scope,el,attrs){
                  var el =el[0];
                  var svg = d3.select(el)
                          .append('svg').style('background','white')
                          .style('width', '100%').style('height', '100%');
                 
				  drawLineChart = function() {
                    svg.selectAll('*').remove();
             
                 
             var margin = {top: 30, right: 50, bottom: 50, left: 100},
                           width = svg.style('width'),
                     height = svg.style('height'),
                     height = parseInt(height),
                     width = parseInt(width);
                    
                    height = height - margin.top - margin.bottom,
                   width = width - margin.left - margin.right;
                        
                    var x = d3.scale.ordinal().rangeRoundBands([0, width]);

                    var y = d3.scale.linear().range([height, 0]);

                    var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom")
                        .ticks(5)
                        .ticks(d3.time.days, 1)
                        .tickFormat(d3.time.format('%d/%m/%y'));

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .ticks(5)
                    ;
                // var parseDate = new Date(); 
                    var tip = d3.tip()
                          .attr('class', 'd3-tip')
                          .offset([-10, 0])
                          .html(function(d) {
                            return "<strong>Date:</strong> <span style='color:white'>" + d.salesdate + "</span> <br/>" + "<strong>Amount:</strong><span style='color:white'>$" + d.amount + "</span>";
                          })
                 
                    var valueline = d3.svg.line()
                        .x(function(d) { return x(new Date(d.salesdate)) + x.rangeBand()/2;; })
                        .y(function(d) { return y(d.amount); })
                      
                    scope.$watch('data', function(data){
                         if(!data){ return }
                        
    				var svgGroup = svg.append("g")
                              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                               x.domain(data[0].sales.map(function(d) { return new Date(d.salesdate) }));
							   y.domain([0, d3.max(data[0].sales, function(d) { return d.amount; })]);
                    
                        // draw the path
                    svgGroup.append("path").attr("d",valueline(data[0].sales)).attr('stroke', 'steelblue')
                      .attr('stroke-width', 2)
                      .attr('fill', 'none');
                    
                   
                     // x axis   
                    svgGroup.append("g")
                          .attr("class", "x axis")
                          .attr("transform", "translate(0," + height + ")")
                          .call(xAxis)
                          .append("text")
                          .style("text-anchor", "end")
                          .attr("transform", "rotate(0)" )
                         .attr("dx", "28em").attr("dy", "3em").text("Sales Date");
                    
                        // y axis
                    svgGroup.append("g")
                          .attr("class", "y axis")
                          .call(yAxis)
                    
                        .append("text")
                          .attr("transform", "rotate(-90)")
                          .attr("y", 6)
                          .attr("dy", "-5.1em")
                          .style("text-anchor", "middle").text("Amount");
                     svgGroup.call(tip);
                        
                      var circle = svgGroup.selectAll("dot")
                                    .data(data[0].sales)
                                    .enter().append("circle")
                                    .attr("r", 3.5)
                                    //.attr("cx", function(d) { return x(d.category); })
                                    .attr("cx", function(d) { return x(new Date(d.salesdate)) + x.rangeBand()/2; })
                                    .attr("cy", function(d) { return y(d.amount); })
                                    .attr('fill','steelblue')
                                    .on('mouseover', tip.show)
                                   .on('mouseout', tip.hide)

                  
             }) // end of watch
                          } // end of drawgraph
                      
                             drawLineChart()
                           
                }, //end of link

                 template: '<div id="chart" class="chart-margin"> Product Sales Line Chart</div>',
              controller: function($scope){
                                    angular.element($window).on('resize', function(){ $scope.$apply(drawLineChart()) });
                                    }
                 }
            
            })
