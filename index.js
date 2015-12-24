'use strict';
let http = require('http');
var server = http.createServer((req, res) => {
	let now = new Date();
	console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);
	res.writeHead(200, {
		'Content-Type': 'text/plain',
		'charset': 'utf-8'
	});

	switch (req.method) {
		case 'GET':
			res.write('GET ' + req.url);
			break;
		case 'POST':
			res.write('POST ' + req.url);
			req.on('data', (data) => {
				console.info('[' + now + '] Data posted: ' + data);
			});
			break;
		default:
			break;
	}
	res.end();
}).on('error', (e) => {
	console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
	console.error('[' + new Date() + '] Client Error', e);
});
let port = 8000;
server.listen(port, () => {
	console.info('[' + new Date() + '] Listening on ' + port);
});