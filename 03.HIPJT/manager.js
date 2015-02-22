
var nameAddressMap = {
    "192.168.100.100": "User00",
    "192.168.100.101": "User01",
    "192.168.100.102": "User02",
    "192.168.100.103": "User03"
};


/*
 * ACCOUNT NAME GETTER
 */
var util = require("./utility");

exports.getAccountName = function() {

    var ipAddress = (util.getClientInfo()).address;

    return nameAddressMap[ipAddress];
};

