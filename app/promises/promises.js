let fs = require('fs');
let path = require('path');

function readJsonSync (filename) {
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

function readJsonAsync(filename, callback) {
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) return callback(err);
        try {
            data = JSON.parse(data);
        } catch (e) {
            callback(e);
        }
        return callback(null, data);
    });
}

function readJsonPromise(filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, 'utf8', function(err, data){
            if (err) reject(err);
            try {
                resolve(JSON.parse(data));
            } catch (e) {
                reject(e);
            }
        });
    });
}

// Implementations
const jsonPath = path.join(__dirname, 'sampledata.json');

console.log("Sync: ", readJsonSync(jsonPath));

readJsonAsync(jsonPath, function(err, data) {
    if (err) return console.log(err);
    console.log("Callback:", data);
});

readJsonPromise(jsonPath)
    .then(function(data) { console.log("Promise:", data) })
    .catch(function(err) { console.log("Promise error: ", err) });
