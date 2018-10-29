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

let responses = {};

function handlerResponses(filename, text) {
    if (!(filename in responses)) {
        responses[filename] = text;
    }
    let filenames = ['file1', 'file2', 'file3'];
    for (let i = 0; i < filenames.length; i++) {
        if (filenames[i] in responses) {
            if (typeof responses[filenames[i]] === 'string') {
                outPut(responses[filenames[i]]);
                responses[filenames[i]] = false;
            }
        } else {
            return;
        }
    }
    outPut('Completed')
}

const getFile = (file) => fakeAjaxCall(file, (text) => {
    handlerResponses(file, text);
});


getFile('file1');
getFile('file2');
getFile('file3');
