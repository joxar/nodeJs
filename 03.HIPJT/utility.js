/* added by snuf START */

/*
 * STYLE SETTER
 */
var LEN_2 = 2;
var LEN_8 = 8;
var SPACE = "&nbsp";
var ZERO = "0";
var HEAD = "HEAD";
var TAIL = "TAIL";

function adjLength(beforeStr, headOrTail, padStr, num) {
	var beforeStr = "" + beforeStr;
	var afterStr = beforeStr;

    if (beforeStr.length < num) {
		if (headOrTail == "TAIL") {
			for (var i=1; i<num; i++) {
				afterStr = afterStr + padStr;
			}
		} else if (headOrTail == "HEAD") {
			for (var i=1; i<num; i++) {
				afterStr = padStr + afterStr;
			}
		}
	} else if (beforeStr.length > num) {
		afterStr = beforeStr.substr(0, num);
	}

	return afterStr;
};


/*
 * CLIENT ADDRESS GETTER
 */
var os = require("os");

exports.getClientInfo = function() {

    var ifacesObj = {};
    ifacesObj.ipv4 = [];
    ifacesObj.ipv6 = [];
    var ifacesObj_ipvX = "";
    var interfaces = os.networkInterfaces();

    for (var dev in interfaces) {

        interfaces[dev].forEach(function(details) {

                if (!details.internal) {
                    switch(details.family) {
                    case "IPv4":
                        ifacesObj.ipv4.push( { name:dev, address:details.address } );
                        break;
                    case "IPv6":
                        ifacesObj.ipv6.push( { name:dev, address:details.address } );
                        break;
                    }
                }

        });

		ifacesObj_ipvX = ifacesObj.ipv4[0];
    }

    return ifacesObj_ipvX;
};

/*
 * MESSAGE FORMATTER
 */
var manager = require("./manager");

exports.formatMessage = function(msg) {

	var SPRT01 = SPACE + SPACE;
	var SPRT02 = ":" + SPACE + SPACE;
	var SPRT03 = "/";
	var SPRT04 = ":";

	var accountName = manager.getAccountName();
	accountName = adjLength(accountName, TAIL, SPACE, LEN_8);
	var dt = new Date();
	var dt_str = "" + dt.getFullYear() + SPRT03
                    + (dt.getMonth()+1) + SPRT03
                    + dt.getDate() + SPACE
	                + adjLength(dt.getHours(), HEAD, ZERO, LEN_2) + SPRT04
	                + adjLength(dt.getMinutes(), HEAD, ZERO, LEN_2) + SPRT04
	                + adjLength(dt.getSeconds(), HEAD, ZERO, LEN_2);

	var formattedMsg = dt_str + SPRT01 + accountName + SPRT02 + msg;

	return formattedMsg;
};

