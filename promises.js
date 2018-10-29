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

const promise1 = getFile('file1');
const promise2 = getFile('file2');
const promise3 = getFile('file3');

promise1
    .then(outPut)
    .then(() => promise2)
    .then(outPut)
    .then(() => promise3)
    .then(outPut)
    .then(() => outPut('Completed!'));

/* Combine promises */

const combine = (chain, pr) => chain.then(() => pr).then(outPut);

const result = ['file1', 'file2', 'file3']
    .map(getFile)
    .reduce(combine, Promise.resolve())
    .then(() => outPut('Completed!'));
