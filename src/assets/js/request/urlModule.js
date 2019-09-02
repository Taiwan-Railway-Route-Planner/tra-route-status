/**
 Created by svend on 14/06/2019.
 **/

module.exports = (function () {

    const HOME_IP = "taiwan-railway-route-planner.github.io";
    const BASE_URL = "https://" + HOME_IP + "/TRATimetableData/";

    const EXTERNALIP = "192.168.1.54:8000";
    const BACKEND = "http://" + EXTERNALIP + "/api/";

    const url = {
        station: BASE_URL + "stationInfo.json",
        easyToSearchStationInfo: BASE_URL + "easyToSearchStationInfo.json",
        schedulesDay: BACKEND + "route"
    };

    return {
        url
    }

})();
