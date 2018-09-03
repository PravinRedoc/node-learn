const req=  require('request');
var geoCode =(lat ,lng, callback) =>{

    req({
            url:'https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude='+lat+'6&longitude='+lng+'&oneobservation=true&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg',
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
module.exports = {
    geoCode
}