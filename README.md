# GateWatch API Client for node.js

See https://gatewatch.de/api for API details.

## Initialization

```javascript
var GateWatch = require('gatewatch');

var g = new GateWatch('username', 'password');
```


## listEvents(callback) — list all events

```javascript
g.listEvents(callback)
```

### Arguments

* `callback(err, data)` — a callback which is called when the data is ready, or an error has occurred.


## getEvent(eventID, callback) — Get event details

```javascript
g.getEvent(eventID, callback)
```

### Arguments

* `eventId` — a number, the ID of the event for which details should be fetched.
* `callback(err, data)` — a callback which is called when the data is ready, or an error has occurred.


## getTickets(eventId, callback) — get ticket list

```javascript
g.getTickets(eventId, callback)
```

### Arguments

* `eventId` — a number, the ID of the event for which all tickets should be fetched.
* `callback(err, data)` — a callback which is called when the data is ready, or an error has occurred.
