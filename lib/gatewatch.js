var request = require('request');


function GateWatch(login, passwd, url) {
    this.config = {
        login: login,
        passwd: passwd,
        url: url || 'https://www.gatewatch.de/api'
    };
}


GateWatch.prototype.makeRequest = function (opt, callback) {
    opt.login = this.config.login;
    opt.password = this.config.passwd;
    request({url:this.config.url, method:'POST', form:opt},
        function (error, req, body) {
            var data = JSON.parse(body);
            callback(error || data.error, data);
        });
};


GateWatch.prototype.listEvents = function (callback) {
    var opt = {'request_type':'listEvents', 'request_value':''};
    this.makeRequest(opt, callback);
};


GateWatch.prototype.getEvent = function (id, callback) {
    var opt = {'request_type':'getEvent', 'request_value':JSON.stringify({eventId: id})};
    this.makeRequest(opt, callback);
};


GateWatch.prototype.getTickets = function (id, callback) {
    var opt = {'request_type':'getTickets', 'request_value':JSON.stringify({eventId: id})};
    this.makeRequest(opt, callback);
};


module.exports = GateWatch;