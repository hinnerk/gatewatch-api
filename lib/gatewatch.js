'use strict';

var request = require('request');


var createConnection = function (login, passwd, url) {
    url = url || 'https://www.gatewatch.de/api';

    var makeRequest = function (dataProperty, opt, callback) {
        opt.login = login;
        opt.password = passwd;
        request({url:url, method:'POST', form:opt},
            function (error, req, body) {
                var data;
                if (error) {
                    callback(error, null);
                } else {
                    try {
                        data = JSON.parse(body);
                    } catch (jsonError){
                        callback(jsonError, null);
                    }
                    if (data.error) {
                        callback(data.error, null);
                    } else if (data.hasOwnProperty(dataProperty)){
                        callback(null, data[dataProperty]);
                    } else {
                        callback('Data has no property "' + dataProperty + '".', null);
                    }
                }
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

exports.createConnection = createConnection;