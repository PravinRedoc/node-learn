const yargs = require('yargs');
const req = require('request');
const geoMethod = require('./geoMethods')
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
    geoMethod.geoCode(latitude,longitude,(errorMessage,results)=>{
        if(errorMessage){console.log(errorMessage)};
        console.log()

    })



}
/*

*/









    )

