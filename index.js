const csv = require('csv-parser');
const fs = require('fs');



// a.	Delete canada.txt and usa.txt if already exist using fs module 

fs.unlink('canada.txt', function (err) {
    if (err) return console.log(err);
    console.log('Canada existing file deleted successfully');
});


fs.unlink('usa.txt', function (err) {
    if (err) return console.log(err);
    console.log('USA existing file deleted successfully');
});


// b.	Filter data of Canada and write data to canada.txt
// c.	Filter data of United States and write data to usa.txt
// Callback function used for filtering data 


function getFilteredData(county, callback) {
    const result = [];
    fs.createReadStream('input_countries.csv')
        .pipe(csv())
        .on('data', (row) => {
            const headers = Object.keys(row);

            if (row[headers[0]] === county)
                result.push(row)
        })
        .on('end', () => {
            callback(result)
            console.log(`${county} txt file successfully processed`);
        });
}


//Sending country to filter data

getFilteredData("Canada", callbackCanada)
getFilteredData("United States", callbackUSA)


//Returning data, creating and writing in the file for Canada
function callbackCanada(result) {

    var csv = result.map(function (d) {
        return JSON.stringify(Object.values(d));
    })
        .join('\n')
        .replace(/(^\[)|(\]$)/mg, '')

    fs.writeFileSync('canada.txt', '"country","year","population" \n')
    fs.writeFileSync('canada.txt', csv, { flag: 'a' })
}



//Returning data, creating and writing in the file for USA

function callbackUSA(result) {
    var csv = result.map(function (d) {
        return JSON.stringify(Object.values(d));
    })
        .join('\n')
        .replace(/(^\[)|(\]$)/mg, '')
    fs.writeFileSync('usa.txt', '"country","year","population" \n')
    fs.writeFileSync('usa.txt', csv, { flag: 'a' })
}