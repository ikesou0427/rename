import { exec } from 'child_process';
import { renameSync } from 'fs';
import { join } from 'path';

import Header from './components/header';
import Format from './components/format';
import ImageName from './components/image-name';
import ImageCount from './components/image-count';

// fromディレクトリのファイルを全てフォーマットに沿ったのファイル名にする
function rename() {
    // readdirSync + sortだとソートが大変なのでdir(windows) を利用している (unixの動作未確認 多分無理)
    exec("dir .\\from /b /o:n", { encoding: "utf-8" }, function (error, stdout: string) {
        const format = new Format();

        const file_name_list = format.extractImagesNameFrom(stdout);
        const header = new Header();

        for (let sheet_num = 0; sheet_num < file_name_list.length; sheet_num++) {
            const image_count = new ImageCount(sheet_num);
            const image_name = new ImageName(header, image_count);
            
            renameSync(join('.', 'from', file_name_list[sheet_num]), join('.', 'to', image_name.value));
        }

        const next_header = header.getNext();
        next_header.write();
    });
};

rename();