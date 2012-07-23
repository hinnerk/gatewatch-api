var request = require('request');


var makeGateWatch = function (login, passwd, url) {
    url = url || 'https://www.gatewatch.de/api';

    var makeRequest = function (dataProperty, opt, callback) {
        opt.login = login;
        opt.password = passwd;
        request({url:url, method:'POST', form:opt},
            function (error, req, body) {
                var data = JSON.parse(body);
                callback(error || data.error, data[dataProperty]);
            });
    };

    return {

        listEvents:function (callback) {
            var opt = {'request_type':'listEvents', 'request_value':''};
            makeRequest('eventList', opt, callback);
        },

        getEvent:function (id, callback) {
            var opt = {'request_type':'getEvent', 'request_value':JSON.stringify({eventId:id})};
            makeRequest('eventData', opt, callback);
        },

        getTickets:function (id, callback) {
            var opt = {'request_type':'getTickets', 'request_value':JSON.stringify({eventId:id})};
            makeRequest('tickets', opt, callback);
        }
    };
};

exports.makeConnection = makeGateWatch;