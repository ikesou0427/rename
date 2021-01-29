import { readdirSync, renameSync } from 'fs';
import { join } from 'path'
import Header from './components/header';
import ImageCount from './components/image-count';
import ImageName from './components/image-name';

// ファイル名の再定義 AAから順に import_path フォルダの画像をリネームする
function drawUp() {
    const import_path = join(__dirname, 'to');
    const files = readdirSync(import_path, 'utf-8');

    let previous_file_header = new Header(files[0].substr(0, 2));
    let new_header = new Header('AA');
    let image_count = new ImageCount(0);

    for (const file_name of files) {
        const file_header = new Header(file_name.substr(0, 2));
        const new_image_count = image_count;
        image_count = image_count.increment();

        if (file_header.value !== previous_file_header.value) {
            previous_file_header = file_header;
            new_header = new_header.getNext();
            image_count = new ImageCount(0);
        }

        const new_image_name = new ImageName(new_header, new_image_count);

        const old_path = join(import_path, file_name);
        const new_path = join(import_path, new_image_name.value);
        console.log('rename: ' + old_path + ' => ' + new_path);
        renameSync(old_path, new_path);
    }
}
drawUp();