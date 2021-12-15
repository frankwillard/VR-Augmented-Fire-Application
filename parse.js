  //Parse from first row
//Temporarily removing s9 and s10 because not used
  var names = ["time","hrr","s1","s2","s3","s4","s5","s6","s7","s8","s9","s10"];
  var rows = ["sensorType", "sensorName", "sensorUnit", "sensorX", "sensorY", "sensorZ", "locUnit"];
  
  
  //Creates empty arrays for each of the sensors (column heads in first row)
  for (var i = 0; i < names.length;i++)
    {
      eval("var " + names[i] + " = [];");
    }
  
  //Creates empty dictionary objects for each of the different rows specified in the rows array
  for(var j = 0; j < rows.length; j++)
    {
      eval("var " + rows[j] + " = new Map();");
    }

  //Reads in sensors file
d3.csv("sensors.csv", function(error, data) {

  var count = 0;
  
  //For the data at each time point
  data.forEach(function(d) {
    
    //Iterates between different sensors
    for(var i = 0; i < names.length; i++)
    {
      var name = names[i];
      //If in one of the early rows, attribute the data to the dictionary for its row
      if(count < 7)
        {
          var row = rows[count];
          eval(row + ".set(\"" + name + "\", d." + name + ");");
        }
      //Otherwise, add it to the sensors data array
      else
        {
          eval(names[i] + ".push(parseFloat(d." + name + "));");
        }
    }
    count++;
  });
  
  //For if there is ever an offset
  for(var i = 0; i < time.length; i++)
    {
      time[i] = time[i] + timeoffset;
    }
  
  //Determine max for each unit
  //Have to manually change some unit names- no symbols (other than underscore) in JS var names
  //Can figure out better system for doing that
  for (const [key, value] of sensorUnit.entries()) {
    var unit = value;
    if (value == "%")
      {
        unit = "per";
      }
    else if(value == "kW/m2")
      {
        unit = "kWm2";
      }
    var maxvar = unit + "_max";
    try {
      var type = typeof eval(maxvar);
    } catch(e)
      {
        if(e instanceof ReferenceError)
          {
            eval("window." + maxvar + " = 0;");
          }
      }
    var max = Math.max.apply(Math, eval(key));
    if(max > eval(maxvar))
      {
        eval("window." + maxvar + " = " + max + ";");
      }
  }
  
  
});

