const fs = require('fs')
const path = require('path')
const base = path.dirname(__dirname)

const dadorIntro = fs.readFileSync(path.join(base,'assets','fix','dadorintro.txt'),{encoding: 'utf-8'}).replace(/\d/g,'split')

const txtFolder = path.join(base,'assets','txt')
const txtPaths = fs.readdirSync(txtFolder)

const txts = txtPaths.map((file)=>{
    return {
        title: file,
        txt: fs.readFileSync(path.join(txtFolder,file),{encoding: 'utf-8'}).replace(/\d/g,'')
    }
})

const poems = txts.map((book)=>{
    return book.txt.split('\n').filter(v=>v).map(line=>{
        return isRoman(line) ? 'romana_S' + line + 'romanb_S' : line
    }).map((line)=>{
        return line === line.toUpperCase() ? 'poem_S'+ 'title_S' + line + 'title_S' : line
    }).join('\n').split('poem_S').filter(v=>v).map(poem=>{
        return {
            book: book.title,
            title: poem.split('title_S')[1],
            text: poem.split('title_S')[2].split('romana_S').filter(v=>v).map(subpoem=>{
                return {
                    subpoem_title: subpoem.split('romanb_S')[0],
                    subpoem_text: subpoem.split('romanb_S')[1]
                }
            })
        }   
    })
})


const completa = []

poems.flat().forEach(poem=>{
    if(poem.text.length === 1){
        completa.push(
            {
                book: poem.book,
                title: poem.title,
                text: poem.text[0].subpoem_title.replace(/^\n|\n$/g, '')
            }
        )
    } else {
        poem.text.forEach(subpoem=>{
            completa.push({
                book: poem.book,
                title: poem.title + ` (${subpoem.subpoem_title})`,
                text: subpoem.subpoem_text?.replace(/^\n|\n$/g, '')
            })
        })
    }
})

const filtered = completa.filter((poem,i)=>{
    return (poem?.text || poem.text === '\n') 
}).filter(poem=>{
    return poem.title !== "DADOR"
})

const dadorIntroSplitted = dadorIntro.split('splitsplitsplit').map((v,i)=>{
    return {
        book: 'dador.txt',
        title: `Dador (${i+1})` ,
        text: v.replace(/\n\n/g,'\n').replace(/^\n|\n$/g, '')
    }
})

filtered.splice(14,0, ...dadorIntroSplitted)

const result = {}

filtered.forEach((v,i)=>{
    result[i] = v
})

// fs.writeFileSync('./poems.json',JSON.stringify(result))

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

