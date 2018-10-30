const csp = require('js-csp'),
    go = csp.go, chan = csp.chan,
    put = csp.put, take = csp.take,
    timeout = csp.timeout;

function fakeHttpCall(url) {
    const fake_responses = {
        'file1': 'The first text',
        'file2': 'The middle text',
        'file3': 'The last text'
    };

    const min = 1000;
    const max = 5000;
    const delay = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(`Requesting: ${url} with timeout ${delay}`);

    return function* () {
        yield timeout(delay);
        return fake_responses[url];
    };
}

function* execute() {
    const ch = chan();
    const fakeCalls = ['file1', 'file2', 'file3'].map((file) => fakeHttpCall(file));

    for (let fakeCall of fakeCalls) {
        go(function* () {
            yield put(ch, (yield* fakeCall()));
        });
    }

    for (let i = 0; i < fakeCalls.length; i++) {
        const result = yield take(ch);
        console.log(result);
    }
}

go(function* () {
    yield* execute();
    console.log('Completed!');
});
