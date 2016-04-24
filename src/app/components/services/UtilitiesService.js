(function(){
  'use strict';

  angular.module('app')
        .service('utilitiesService', [
      utilitiesService
  ]);

  function utilitiesService(){


    return {

        CSVToObjects: function(csv) {

            var lines=csv.split("\n");

            var result = [];

            var headers=lines[0].split(",");

            for(var i=1;i<lines.length;i++){

                if (lines[i]) { //ignore blank lines

                  var obj = {};
                  var currentline=lines[i].split(",");

                  for(var j=0;j<headers.length;j++){
                    obj[headers[j]] = currentline[j];
                  }

                  result.push(obj);

                };

            }
            
            return result;

          },


        /**
         * Converts Google Visualisation objects as returned by a Simtricity flow query
         * to an array of {date:, value:} objects, ready for use.
         */
        GVIZToObjects: function(gviz) {
            var status = gviz.indexOf('"status":"ok"');
            if (!status)
            {
                return null;
            }

            var cutOffset = gviz.indexOf('"rows":[') + 8;
            if (8 >= cutOffset)
            {
                console.log('Error: Parsing gviz data failed; did not find row info' + "\n");
                return null;
            }
            gviz = gviz.substr(cutOffset);

            // Parse out the date, value pairs
            var nextPos;
            if (4 >= (nextPos = gviz.indexOf('"v":') + 4))
            {
                // No data!
                return null;
            }
            var next = gviz.substr(nextPos);
            var thisDate = null;
            var thisValue = null;
            var powerData = [];
            while (next)
            {
                // 'new Date()' is already in Javascript format - just 'eval' it
                if (next.substr(0, 'new Date'.length) === 'new Date')
                {
                    var newDate = next.substr(0, next.indexOf(')') + 1);
                    thisDate = eval(newDate);
                    thisValue = null;
                }
                else
                {
                    // Parse float value to go with date
                    if (thisValue !== null)
                    {
                        console.log("Error: Parsing gviz data failed.  Current position:\n" . next);
                        return null;
                    }
                    thisValue = parseFloat(next.substr(0, next.indexOf('}')));
                    // We use 'Time' and 'Import' as the variable names to match up with
                    // the data from the readingService.
                    powerData.push({Time:thisDate, Import:thisValue});
                }
                if (4 >= (nextPos = next.indexOf('"v":') + 4))
                {
                    // No more data found
                    break;
                }
                next = next.substr(nextPos);
            }

            return powerData;
        }
    }

  }
})();
