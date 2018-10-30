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

const getFile = (file) => {
    let text, fn;
    fakeAjaxCall(file, (response) => {
        if (fn) fn(response);
        else text = response;
    });

    return (cb) => {
        if (text) cb(text);
        else fn = cb;
    }
};

const th1 = getFile('file1');
const th2 = getFile('file2');
const th3 = getFile('file3');

th1((text) => {
    outPut(text);
    th2((text2) => {
        outPut(text2);
        th3((text3) => {
            outPut(text3);
            outPut('Complete!');
        })
    });
});
