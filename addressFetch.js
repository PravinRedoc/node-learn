const yargs = require('yargs');
const req = require('request');
const replaceall = require('replaceall');
var argv = yargs
    .options({
        a :{
            demand : true,
            alias :"address",
            string: true,
            describe : "The place whose co ordinated need to be found"

        }
        }

    ).help()
    .argv;
var place= encodeURIComponent(argv.a);


console.log(argv);
req({
    url:'http://www.mapquestapi.com/geocoding/v1/address?key=ENaMhXZw3WWopuAm70cAHQIN7atcjFaO&location='+place,
    json: true

},(error,response,body)=>{
    var longitude,latitude;
    if(error){console.log("Cannot Fetch data \n This may be due \n 1. No Internet Connection \n2. Erroneous URL")}
    else if(body.info.statuscode==400){console.log("\nInvalid Address")}
    else {


        latitude = JSON.stringify(body.results[0].locations[0].latLng.lat);
        longitude = JSON.stringify(body.results[0].locations[0].latLng.lng);

        console.log(`Latitude: ${latitude}  \nLongitude: ${longitude} `);
    }
        req({
                url:'https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude='+latitude+'6&longitude='+longitude+'&oneobservation=true&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg',
                json :true

            },
            (error,response,body)=>{


               var description= replaceall("\"","",(JSON.stringify(body.observations.location[0].observation[0].description))),
                skyDescription= replaceall("\"","",(JSON.stringify(body.observations.location[0].observation[0].skyDescription))),
                   temperature= replaceall("\"","",(JSON.stringify(body.observations.location[0].observation[0].temperature))),
                   humidity=replaceall("\"","",(JSON.stringify(body.observations.location[0].observation[0].humidity))),
                   windSpeed=replaceall("\"","",(JSON.stringify(body.observations.location[0].observation[0].windSpeed)));

               console.log(`The Weather at your place is ${description} where the sky is ${skyDescription} and the temmperatue is ${temperature}o C\n,${humidity} cubic m. humid and the wind is blowing at ${windSpeed}Kmph`)




            }
        )




}
/*

*/









    )

