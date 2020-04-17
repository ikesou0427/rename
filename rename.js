const fs = require('fs');
const path = require('path');

const zeroPadding = num    => {
    return ('000' + num).slice(-3);
}

const incrementString = str => {
    if (str.charCodeAt(1) === 90) {
        return String.fromCharCode(str.charCodeAt(0) + 1, 65)
    }
    return String.fromCharCode(str.charCodeAt(0), str.charCodeAt(1) + 1);
}
const encode = str => {
    str = str.split(' ').join('\\' + ' ');
    str = str.split(')').join('\\' + ')');
    str = str.split('(').join('\\' + '(');
    return str;
}

const rename = () => {
    const inportPath = path.join(__dirname, 'from');
    const files = fs.readdirSync(inportPath,(err, files) => {
        if(err){
            console.log(err);
        }
        return files.map(encode);
    });

    const exportPath = path.join(__dirname,'to');
    const initial = JSON.parse(fs.readFileSync("filename.json"))["index"];
    for(let idx = 0;idx < files.length;idx++){
        const oldImaegPath = path.join(inportPath, files[idx]);
        const newImagePath = path.join(exportPath, initial + zeroPadding(idx) + '.jpg');
        console.log('rename: ' + oldImaegPath + ' => ' + newImagePath);
        fs.renameSync(oldImaegPath, newImagePath);

    }
    const newInitial = { "index": incrementString(initial) };
    fs.writeFile(__dirname + "/filename.json", JSON.stringify(newInitial), error => error ? console.log(error) : console.log('done!') );
};

rename();
