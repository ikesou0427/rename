const exec = require('child_process').exec;
const fs = require('fs');

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
    exec('ls -m ' + "from", (error, stdout) => {
        const fileName = stdout.replace(/\n/g,'').split(',').map(x => x.trim()).map(encode);

        const newFileIndex = JSON.parse(fs.readFileSync("filename.json"))["index"];
        let index = 0;
        for (name of fileName) {
            exec("mv " + "./from/" + name + " ./to/" + newFileIndex + zeroPadding(index++) + ".jpg", (error, stdout) => {
                if (error) {
                    console.log(error)
                    return;                    
                }
            });
        }
        const saveContent = { "index": incrementString(newFileIndex) };
        fs.writeFile(__dirname + "/filename.json", JSON.stringify(saveContent), error => {
            if (error) {
                console.error(error);
                return;
            }
        });
    });
};

rename();
