/**
 Created by svend on 9/08/2019.
 **/

const postRequest = require('../../RequestFormat/PostFormat/PostFormat.js');
const urlModule = require('../../urlModule');
const errorMessages = require('../../errorMessage');

module.exports =  (function () {

    const getTheInformation = async function (departure, arrival) {
        let response = await postRequest.fetchRequestForGettingData({
            Url: urlModule.url.schedulesDay,
            getSpecifiedElement: false,
            method: "POST",
            body: {
                departure: {
                    details : arrival
                },
                arrival: {
                    details: departure
                },
                time:{
                    date:  {
                        "show": "2019年7月12日",
                        "real": "20190901"
                    },
                    time:  "00:00"
                }
            }
        });
        response = response.data;
        if (response.error) {
            response.msg = errorMessages.messages.eng.route;
        }
        return response;
    };

    return {
        getTheInformation
    }

})();
