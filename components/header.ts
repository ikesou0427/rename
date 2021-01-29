import { readFileSync, writeFileSync } from 'fs';
import ImageCount from './image-count';
const header_file_path = './../next-header.json';

export default class Header {
    private _value: string;

    constructor(header?: string) {
        
        if (header === undefined) {
            this._value = this.getLatest();
            return;
        } 
        
        if (! this.isValid(header)) {
            throw new Error('無効なヘッダーが指定されました。');
        }
        
        this._value = header;
    }

    get value(): string {
        return this._value;
    }

    private isValid(header: string): boolean {
        return /^[A-Z]{2}$/.test(header);
    }

    private getLatest(): string {
        return JSON.parse(readFileSync(header_file_path, 'utf-8'))['_value'];
    }

    public getNext(): Header {
        if (this._value.charCodeAt(1) === 90) {
            return new Header(String.fromCharCode(this._value.charCodeAt(0) + 1, 65));
        }
        return new Header(String.fromCharCode(this._value.charCodeAt(0), this._value.charCodeAt(1) + 1));
    }

    public write() {
        const save_header = { '_value' : this._value };
        writeFileSync(header_file_path, JSON.stringify(save_header));
    }
}