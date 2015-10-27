import path from 'path';
import bodyParser from 'body-parser';
import Express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

import * as api from './server/api/http';
import * as eventService from './server/api/server/event';
import * as uni from './server/universalApp';

const app = Express();
const httpServer = http.Server(app);
const port = 3000;

let io = SocketIO(httpServer);

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'jade');

/**
 * Server Middleware Layers
 */

 app.use(require('serve-static')(path.join(__dirname, 'dist')));
 app.use(bodyParser.urlencoded({
   extended: true
 }));
 app.use(bodyParser.json());

 /**
  * Iso app endpoint
  */

 app.get('/', uni.handleRender);

 /**
  * API endpoints
  */
app.get('/api/0/events', api.getEvents);
app.post('/api/0/events', api.addEvent);
app.post('/api/0/events/:id', api.editEvent);
app.delete('/api/0/events/:id', api.deleteEvent);

eventService.liveUpdates(io);

httpServer.listen(port);
