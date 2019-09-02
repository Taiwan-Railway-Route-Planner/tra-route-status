/**
 Created by svend on 1/09/2019.
 **/

const initScreen = require('./SetUp/initScreen');
const requestHandler = require("../../request/requestHandler");

export default (function () {


    const handle = async function (_self) {
        await initScreen.getAllStationData(_self, requestHandler);
        (_self.stationInfo.forEach(function (el) {
            _self.keys.push(el.eng站名);
        }));
        await createItems(_self);
    };

    async function createItems(_self){
        for (let el of _self.stationInfo){
            let currentItem = el;
            let item = {};
            item["Name"] = currentItem.eng站名;
            for (let elementje of _self.stationInfo) {
                if (el !== elementje) {
                    let data = await requestHandler.request.routePost(currentItem, elementje);
                    if ("message" in data){
                        item[elementje.eng站名] = null;
                    } else {
                        item[elementje.eng站名] = data.data.data.length;
                    }

                } else {
                    item[el.eng站名] = null;
                }
            }

            _self.items.push(item);
            console.log(_self.items);
        }
    }



    return {
        handle
    }

})();
