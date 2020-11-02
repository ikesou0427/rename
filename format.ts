export class Format {
    public encode(str : string) : string {
        str = str.split(' ').join('\\' + ' ');
        str = str.split(')').join('\\' + ')');
        str = str.split('(').join('\\' + '(');
        return str;
    }

    public zeroPadding(sheet_num : number) : string {
        return ('000' + sheet_num).slice(-3);
    }
}