
import { renameSync, existsSync } from 'fs';
import { join } from 'path';
import Header from './components/header';
import ImageCount from './components/image-count';
import ImageName from './components/image-name';

const target_directory = join(__dirname, 'to');

// 引数で指定されたヘッダーを入れ替える
function swapImageHeader() {
    const first_image_count = new ImageCount(0);
    const header1 = new Header(process.argv[2]);
    const header2 = new Header(process.argv[3]);
    const tmp_header = new Header('ZZ');

    const header1_image_name = new ImageName(header1, first_image_count);
    if (! existsSync(join(target_directory, header1_image_name.value))) {
        console.log("先に指定されたヘッダーは使用されていません。");
        console.log(join(target_directory, header1_image_name.value));
        return;
    }

    const header2_image_name = new ImageName(header2, first_image_count);
    if (! existsSync(join(target_directory, header2_image_name.value))) {
        console.log("後に指定されたヘッダーは使用されていません。");
        console.log(join(target_directory,  header2_image_name.value));
        return;
    }

    renameAll(header1, tmp_header);
    renameAll(header2, header1);
    renameAll(tmp_header, header2);
}

function renameAll(old_header: Header, new_header: Header) {
    const first_image_count = new ImageCount(0);
    let old_header_image_name = new ImageName(old_header, first_image_count);
    let new_header_image_name = new ImageName(new_header, first_image_count);

    while (existsSync(join(target_directory, old_header_image_name.value))){
        const old_image_path = join(target_directory, old_header_image_name.value);
        const new_image_path = join(target_directory, new_header_image_name.value);

        console.log('rename: ' + old_header_image_name.value + ' => ' + new_header_image_name.value);
        renameSync(old_image_path, new_image_path);

        old_header_image_name = old_header_image_name.next();
        new_header_image_name = new_header_image_name.next();
    }
}

swapImageHeader();