const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')
const base = path.dirname(__dirname)

const pdfFolder = path.join(base,'assets','pdfs')
const p = fs.readdirSync(pdfFolder)

for(const f of p){
    exec(`pdftotext ${pdfFolder}/${f}`)
}