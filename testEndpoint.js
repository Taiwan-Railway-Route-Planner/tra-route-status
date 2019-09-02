const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const fetch = require("node-fetch");
const stationInfo = require('./stationInfo');

var hrstart = process.hrtime()

function exportNewData(newData) {
    fs.writeFile("./result.txt", JSON.stringify(newData), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

let fetchRequestForGettingData = function (departure, arrival) {
    return fetch("http://192.168.1.54:8000/api/route", {
        method: "POST",
        body:  JSON.stringify({
            departure: {
                details: departure
            },
            arrival: {
                details: arrival
            },
            time: {
                date: {
                    real: "20190902"
                },
                time: "10:00"
            }
        })
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return {error: true, msg: '', data: response};
        }
    }).then(json => {
        return {error: false, msg: 'ok', data: json};
    }).catch(function (error) {
        console.log('Request failed ', error);
        return {error: true, msg: '', data: error};
    })
};

const startTesting = async function () {
    let resultString = "";
    for (let i = 0; i < stationInfo.stations.length; i++) {
        let firstElement = stationInfo.stations[i];
        for (let j = 0; j < stationInfo.stations.length; j++) {
            if (firstElement !== stationInfo.stations[j]) {
                let result = await fetchRequestForGettingData(firstElement, stationInfo.stations[j]);
                resultString += checkResultOfRequest(result, firstElement, stationInfo.stations[j]);
            }
        }
        exportNewData(resultString);
        hrend = process.hrtime(hrstart);
        let minutes = ~~(hrend[0] / 60);
        let seconds = hrend[0] - minutes * 60;
        console.info('Execution time (hr): %dm %ds %dms', minutes,   seconds, hrend[1] / 1000000);
    }
    exportNewData(resultString);
};

function checkResultOfRequest(result, departure, arrival) {
    if ("data" in result.data.data ){
        return`${departure.eng站名},${arrival.eng站名},${result.data.data.data.length} \n `;
    } else {
        return`${departure.eng站名},${arrival.eng站名},0\n `;
    }

}

startTesting();