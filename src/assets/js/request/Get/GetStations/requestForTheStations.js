/**
 Created by svend on 14/06/2019.
 **/

const getRequest = require('../../RequestFormat/GetFormat/GetFormat');
const urlModule = require('../../urlModule');
const errorMessages = require('../../errorMessage');

module.exports = (function () {

    const getTheInformation = async function () {
        const response = (await getRequest.fetchRequestForGettingData({
            Url: urlModule.url.station,
        }));
        if (response.error) {
            response.msg = errorMessages.messages.eng.stations;
        }
        return response;
    };

    return {
        getTheInformation
    }

})();
