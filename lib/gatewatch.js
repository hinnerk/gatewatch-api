var request = require('request');


var makeGateWatch = function (login, passwd, url) {
    url = url || 'https://www.gatewatch.de/api';

    var makeRequest = function (opt, callback) {
        opt.login = login;
        opt.password = passwd;
        request({url:url, method:'POST', form:opt},
            function (error, req, body) {
                var data = JSON.parse(body);
                callback(error || data.error, data);
            });
    };

    return {

        listEvents:function (callback) {
            var opt = {'request_type':'listEvents', 'request_value':''};
            makeRequest(opt, callback);
        },

        getEvent:function (id, callback) {
            var opt = {'request_type':'getEvent', 'request_value':JSON.stringify({eventId:id})};
            makeRequest(opt, callback);
        },

        getTickets:function (id, callback) {
            var opt = {'request_type':'getTickets', 'request_value':JSON.stringify({eventId:id})};
            makeRequest(opt, callback);
        }
    };
};


exports.makeConnection = makeGateWatch;