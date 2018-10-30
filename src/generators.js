const fakeAjaxCall = (url, cb) => {
    const fake_responses = {
        'file1': 'The first text',
        'file2': 'The middle text',
        'file3': 'The last text'
    };

    const min = 1000;
    const max = 5000;
    const timeout = Math.floor(Math.random() * (max - min + 1) + min);
    console.log('Requesting: ' + url + ' with timeout ' + timeout);
    setTimeout(() => cb(fake_responses[url]), timeout);
};

const outPut = (text) => console.log(text);

const getFile = (file) => new Promise((resolve) => fakeAjaxCall(file, (response) => resolve(response)));

function runGenerator(g) {
    let it = g(), ret;

    (function iterate(val) {
        ret = it.next(val);

        if (!ret.done) {
            if ('then' in ret.value) {
                ret.value.then(iterate);
            } else setTimeout(() => iterate(ret.value), 0);
        }
    })();
}

runGenerator(function* main() {
    const promises = ['file1', 'file2', 'file3'].map(file => getFile(file));
    for (let res of promises) {
        outPut(yield res);
    }
    outPut('Completed!')
});
