const fs = require('fs')
const path = require('path')
const base = path.dirname(__dirname)

const txtFolder = path.join(base,'assets','txt')
const txtPaths = fs.readdirSync(txtFolder)

const txts = txtPaths.map((file)=>fs.readFileSync(path.join(txtFolder,file),{
    encoding: 'utf-8'
}))

// console.log(txt.split('\n').map(line=>{
//     return isRoman(line) ? 'romansplit' + line + 'romansplit' : line
// }).map((line)=>{
//     return line === line.toUpperCase() ? 'Splithere ' + line : line
// }).join('').split('Splithere ').filter(v=>v))

function isRoman(str) {
    const romanNums = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };

    if (typeof str !== 'string' || str === '') {
        return false;
    }

    let prevValue = 0;
    let total = 0;

    for (let i = str.length - 1; i >= 0; i--) {
        const char = str[i];
        const value = romanNums[char];
        if (value === undefined) {
            return false;
        }
        if (value < prevValue) {
            total -= value;
        } else {
            total += value;
        }
        prevValue = value;
    }

    return true;
}

