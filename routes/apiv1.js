
var express = require('express');
var router = express.Router();
var REQUEST = require('request');

var request = REQUEST.defaults( {
    strictSSL: false
});

var OPENWEATHERURL = "http://api.openweathermap.org/data/2.5/weather?q=";



exports.getWeather = function(req, res) {
	var zip = req.query.zip;
	if( (zip === null) || (typeof(zip) === 'undefined') ) {
		return res.status(400).send('zip missing');
	}

	var aurl = OPENWEATHERURL + zip + "&unit=metric&APPID=6f9927c97f4a2621ce91e7477afaac42";

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
 
    	} else {
    		if(body.cod >0) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + 'C';
    			var response = {city: body.name, weather: weath};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather', exports.getWeather);


exports.getWeather2 = function(req, res) {
	var zip = req.query.zip;
	if( (zip === null) || (typeof(zip) === 'undefined') ) {
		return res.status(400).send('zip missing');
	}

	var aurl = OPENWEATHERURL + zip + "&unit=metric&APPID=6f9927c97f4a2621ce91e7477afaac42";

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod >0) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			var response = {city: body.name, weather: weath};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather2', exports.getWeather2);


exports.router = router;
