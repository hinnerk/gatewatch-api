'use strict';

var request = require('request');


var createConnection = function (login, passwd, url) {
    url = url || 'https://www.gatewatch.de/api';

    var makeRequest = function (dataProperty, opt, callback) {
        opt.login = login;
        opt.password = passwd;
        request({url:url, method:'POST', form:opt},
            function (error, req, body) {
                var errorCode = {
                        101:'ACCESS DENIED', // Zugang verwehrt oder Zugangsdaten ungültig
                        102:'INVALID REQUEST_TYPE', // Unbekannter Request-Typ (request_type)
                        103:'INVALID REQUEST_VALUE', // Ungültige Request Daten (request_value)
                        201:'INVALID EVENT ID', // Ungültige Event ID
                        202:'DONWLOAD ALREADY ACTIVE', // Veranstaltung ist bereits zum Download freigeschaltet
                        203:'EVENT CLOSED', // Veranstaltung wurde bereits geschlossen
                        204:'MAX COUNT OF TICKETS REACHED', // Maximale Anzahl an Tickets überschritten
                        205:'TICKET IMPORT ERROR', // Fehler beim Import von Tickets
                        206:'INAVLID LANGUAGE SELECTED' // Ungültige Sprache für Print@Home Ticket angegeben
                    },
                    data;
                if (error) {
                    callback(error, null);
                } else {
                    try {
                        data = JSON.parse(body);
                    } catch (jsonError) {
                        callback(jsonError, null);
                    }
                    if (data.error) {
                        callback({error:data.errorCode + ' (' + errorCode[data.errorCode] + ')'}, null);
                    } else if (data.hasOwnProperty(dataProperty)) {
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