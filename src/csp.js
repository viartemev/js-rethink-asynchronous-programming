const csp = require('js-csp');


function* process1(channel) {
    yield csp.put(channel, 'Hello');
    const msg = yield csp.take(channel);
    console.log(msg);
}

function* process2(channel) {
    const msg = yield csp.take(channel);
    yield csp.put(channel, (msg + ' World'));
    console.log('Done!');
}

csp.go(function* () {
    const ch = csp.chan();
    csp.go(process1, [ch]);
    csp.go(process2, [ch]);
});
