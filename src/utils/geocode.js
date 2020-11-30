const request = require('request');


const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGRlbWlya2FsZSIsImEiOiJjam43anZub3owN3cxM3BwaTFmdzNqd2IyIn0.rDkuXRAidLVU_dBykgxstQ&limit=1';


    request({url:url, json:true}, (error,{body})=> {

        if(error){
            callback('Unable to connect to location services!',undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location! Try another search!',undefined);
        }else{

            callback(undefined, {
                latitude:body.features[0].center[1],
                longtitude:body.features[0].center[0],
                location:body.features[0].place_name
            });

        }

    });

}

const forecast = (latitude,longtitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=bb9eeb4779762ca667420eb7a6bd837a&query='+latitude+','+longtitude; //37.8267,-122.4233

    request({url, json:true}, (error,{body})=> {

        if(error){
            callback('Unable to connect to weather services!',undefined);
        }else if( body.error){
            callback('Unable to find weather! Try another search!',undefined);
        }else{

            callback(undefined, {
                temperature:body.current.temperature,
                feelslike:body.current.feelslike
            });

        }

    })

}

module.exports = {geocode:geocode,forecast:forecast};