/**
 Created by svend on 1/09/2019.
 **/



module.exports = (function () {

    async function getAllStationData(_self, requestHandler) {
        if (_self.$store.state.stations === null || _self.$store.state.stations === undefined) {
            const stations = await requestHandler.request.stations(_self);
            _self.$store.commit('updateStation', stations.data.stations);
            _self.stationInfo = stations.data.stations;
        } else {
            _self.stationInfo = _self.$store.state.stations;
        }
    }

    return {
        getAllStationData
    }

})();
