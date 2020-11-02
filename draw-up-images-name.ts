
import fs from 'fs';
import path from 'path'
import {Header} from './header';

function drawUp() {
    // ファイル名の再定義 AAから順に import_path フォルダの画像をリネームする
    const import_path : string = path.join(__dirname, 'to');
    const files : Array<string> = fs.readdirSync(import_path, 'utf-8');

    const header = new Header();
    let previous_file_header : string = files[0].substr(0, 2);
    let new_header : string           = 'AA';

    for (const file_name of files) {
        const file_header : string              = file_name.substr(0, 2);
        const zero_padding_picture_num : string = file_name.substr(2);

        if (file_header !== previous_file_header) {
            previous_file_header = file_header;
            new_header = header.getNextHeader(new_header);
        } 

        const old_path : string = path.join(import_path, file_name);
        const new_path : string = path.join(import_path, new_header + zero_padding_picture_num);
        console.log('rename: ' + old_path + ' => ' + new_path);
        fs.renameSync(old_path, new_path);
    }
}
drawUp();