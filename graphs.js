/**
* D3 Graph Script- first part applicable to all
*/

var margin = {top: 0, right: 20, bottom: 110, left: 20},
    width = 640 - margin.left - margin.right,
    height = 480 - margin.top - margin.bottom;

//Need to change it from parsing the date
//var parseDate = d3.time.format("%m/%d/%y %M:%S").parse;
var parseTime = d3.time.format("%M:%S").parse;



var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

  
//Changed from timeend-timeoffset to time[time.length]-time[0] 

/*var formatMinutes = function(d) {
  minutes++;
  if(minutes > (time[time.length-1]-time[0])/60)
    {
      minutes = 0;
    }
  return minutes;      
}*/

var minutes = -1; 

var formatMinutes = function(d) {
  minutes++;
  if(minutes > (timeend-timeoffset)/60)
    {
      minutes = 0;
    }
  return minutes;      
}


//Ticks- How many values on axis- should be divisible by maximum - minimum of domain
var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(5)
    .innerTickSize(10)
    .outerTickSize(0)
    .orient("bottom")
    .tickFormat(formatMinutes);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat(function(d) { return d;})
    .ticks(7)
    .innerTickSize(10)
    .outerTickSize(0)
    .orient("left");

//    .x(function(d) { return x(d.time); })

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.temperature); });

//var vid = document.querySelector('#my_video');
var vid = document.querySelector('#imvideo').components["immersive-video"].video;

var graphsToDisplay = [0];  //an array gets elements pushed on and off to determine what sensors get graphs displayed


function allGraphsOff(){
 // console.log("ALLGRAPHSOFF");
   allPrefix.forEach(function(item,index){
  //     console.log("allGraphsOff Gpath:", item+'svg');
   // d3.selectAll('line').selectAll('*').remove();
     d3.selectAll("g > *").remove()
   })
         // d3.select('svg').selectAll('*').remove();
//remove below looks like:   d3.selectAll(".company").select("path").remove();
  
}


//For multi-plot- need to have s8graph append s9svg and s10svg

allPrefix.forEach(function(item) {
 // console.log("item:",item);
  // remember window[string] is how to make a var from a string
  var sensor = item;
  
// MSH - commented out next four lines. messes up graph postion relative to shadow hotspot if s9 and s10 are displayed. 
//  if(sensor == "s9" || sensor == "s10")
//    {
//      sensor = "s8";
//    }
  
  window[item+"svg"] = d3.select("#"+sensor+"graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
});


function sensorGraphOnOff(sensorIndex,onoff,i) {
  //onoff is boolean
  //console.log("sensorIndex: ",sensorIndex);
  //sensorIndex is element from one of the Prefix arrays
  //li is i from graph loop
  
  //Reference to allPrefix
  allPrefix.forEach(function(item,index) {
    //Uses allsensordata instead of sensors csv
    if (sensorIndex[index] == index) {
     d3.csv("sensors.csv", function(error, data) {
    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "time"; }));
       
       var multiSensor = false;
       
      var data = data.map(function (d) { 
        //console.log("keys: ", Object.keys(d));
        
        //Don't use uppercase anymore
        var Citem = allPrefix[sensorIndex[index]];
        if(Citem == "s8")
          {
            multiSensor = true;
            return { time:d.time, ["s8"]: d["s8"], ["s9"]: d["s9"], ["s10"]: d["s10"]}
          }
        else
          {
        return { time:d.time, [Citem]: d[Citem] }
          }
      }).slice(7);    
                     
      var table = [];
       
       var s8table = [[], [], []];
       
        data.forEach(function(d) {
                var min = parseInt(d.time/60);
                var sec = d.time % 60;
                d.time = parseTime(min + ":" + sec);
          });       

       
    let companies = color.domain().map(function(name) {
            
      return {
        name: name,
        values: data.map(function(d) {
          //console.log("name: item: ",name, item);
          //Don't use uppercase anymore
          
          //Current problem is table.length < i
          if(allPrefix[sensorIndex[index]] == "s8")
            {
              if(name == "s8" && s8table[0].length < i)
                {
                    s8table[0].push({time: d.time, temperature: +d[name]});
                    return {time: d.time, temperature: +d[name]};
                }
              else if(name == "s9" && s8table[1].length < i)
                  {
                    s8table[1].push({time: d.time, temperature: +d[name]});
                    return {time: d.time, temperature: +d[name]};
                  }
              else if(name == "s10" && s8table[2].length < i)
                  {
                    s8table[2].push({time: d.time, temperature: +d[name]});
                    return {time: d.time, temperature: +d[name]};
                  }
            }
          else if (name == allPrefix[sensorIndex[index]] && table.length < i) 
          {
            table.push({time: d.time, temperature: +d[name]});
            return {time: d.time, temperature: +d[name]};
          }
        })
      };
    }); //end of var companies  
   
       
       /*
if (allPrefix[sensorIndex[index]] == "s8")
  {
      console.log(s8table);
  }*/
             
              
       //Gets unit
       //Changes name to remove symbol
       var myunit = sensorUnit.get(item);
       if (myunit == "%")
        {
          myunit = "per";
        }
      else if(myunit == "kW/m2")
        {
          myunit = "kWm2";
        }
       
       //Uses unit to create var name to call
       var mymaxvar = myunit + "_max";
       //Finds max for unit and multiply by 1.05
       var graphmax = eval(mymaxvar) * 1.05;
       
  x.domain(d3.extent(data, function(d) {  return d.time;  }));
    y.domain([
      d3.min(companies, function(c) { return 0; }),
      d3.max(companies, function(c) { return graphmax; })
    ]);
   // console.log("XAXIS item+svg: ",item+"svg");
       
    window[item+"svg"].append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .style("font-family", "kelsonsans")
        .style("font-size", "48px")
        .style("stroke-width", "2px")
        .style("stroke", function(d) {
                                        return "white";
                                        
                                           })
        .call(xAxis);


    var company = window[item +"svg"].selectAll(".company")
        .data(companies)
      .enter().append("g")
        .attr("class", "company");

       //return line(table); 
       
       
       
       if(allPrefix[sensorIndex[index]] == "s8")
         {
           var path = window[item+"svg"].selectAll(".company").append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(s8table[0]); })
        .style("stroke-width", "4px")
        .style("stroke", function(d) {
                                        return "yellow";
                                           }); 
           var path2 = window[item+"svg"].selectAll(".company").append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(s8table[1]); })
        .style("stroke-width", "4px")
        .style("stroke", function(d) {
                                        return "red";
                                           }); 
           var path3 = window[item+"svg"].selectAll(".company").append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(s8table[2]); })
        .style("stroke-width", "4px")
        .style("stroke", function(d) {
                                        return "green";
                                           }); 
         }
       else
         {
              var path = window[item+"svg"].selectAll(".company").append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(table); })
        .style("stroke-width", "4px")
        .style("stroke", function(d) {
                                        return "yellow";
                                        //     if (d.name == item.toUpperCase()) 
                                        //   {return "rgb(255,255,000)"}                 
                                        // else {return "yellow";}
                                           }); 
         }
              
    //Appends the graph to the a-entity 
   
    // MSH background shade
    //window[item+"svg"].selectAll(".company").append("rect")
    //.attr("width", "100%")
    //.attr("height", "100%")
   // .attr("opacity","0")
   // .attr("fill", "pink");
    
       
// xAxis label   
    window[item+"svg"].selectAll(".company").append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width-200)
    .attr("y", height + 90)
    .style("font-family", "kelsonsans")
    .style("font-size", "48px")
    .style("stroke", "white")
    .style("stroke-width", "2px")
    .text("time (min) ");


       if (onoff)
       {
         //console.log(cnames[0]);
         //console.log(allPrefix[sensorIndex[index]]);
         window[cnames[0]] = d3.select("#"+allPrefix[sensorIndex[index]].toUpperCase()+"graph").append('svg');
       }
   
  }) //end of d3.csv
  }
})
};


/**
* D3 Graph Script for TC Sensors
*/

function graph() {
  var i = 0;
  var table = [];  
  
  //Now using auto generated time array
  //var secondsarr = makeArr(timeoffset, timeend, timeend-timeoffset+1);
  
  while(vid.currentTime > time[i]) {
    if(i > time.length) {
      break;
    }
    if(vid.currentTime < time[i+1]) {
      break;
    }
    i++;
  }
  
  sensorGraphOnOff(graphsToDisplay,true,i);  
  
  setTimeout(function () { 
      d3.selectAll(".company").select("path").remove();
      graph();
  }, 3000);
}  // end of graph()
