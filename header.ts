import fs from 'fs';
const header_file_path : string = __dirname + '/next-header.json';

export class Header {
    public getHeader() : string {
        return JSON.parse(fs.readFileSync(header_file_path, 'utf-8'))['index'];
    }

    public getNextHeader(header : string) : string {
        if (header.charCodeAt(1) === 90) {
            return String.fromCharCode(header.charCodeAt(0) + 1, 65)
        }
        return String.fromCharCode(header.charCodeAt(0), header.charCodeAt(1) + 1);
    }

    public writeHeder(header : string) : void {
        const save_index : object = { 'index' : this.getNextHeader(header) };
        fs.writeFileSync(header_file_path, JSON.stringify(save_index));
    }
}