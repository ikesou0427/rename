import {exec} from 'child_process';
import {Header} from './header';
import {Format} from './format';

function rename() {
    exec("dir .\\from /b /o:n", { encoding: "utf-8" }, function (error, stdout : string) : void {
        const format : Format = new Format();
        const header : Header = new Header();

        const file_name_list : Array<string> = stdout.split('\n').map((str : string) => str.trim()).map(format.encode).filter(Boolean);
        const new_header : string = header.getHeader();

        console.log(file_name_list)
        for (let sheet_num : number = 0;sheet_num < file_name_list.length;sheet_num++) {
            exec(`move .\\from\\${ file_name_list[sheet_num] }  .\\to\\${ new_header }${ format.zeroPadding(sheet_num) }.jpg`, (error, stdout) => {
                if (error) {
                    console.log(error)
                    return;
                }
            });
        }

        header.writeHeder(new_header);
    });
};

rename();