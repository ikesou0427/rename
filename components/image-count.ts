export default class ImageCount {
    private _value: number;

    constructor(image_count: number) {
        if (! this.isValid(image_count)) {
            throw new Error('不正なページ数が指定されました。 : ' + image_count);
        }

        this._value = image_count;
    }

    get value(): string {
        return this.zeroPadding(this._value);
    }

    private isValid(image_count: number): boolean {
        return 0 <= image_count;
    }

    private zeroPadding(sheet_num: number): string {
        return ('000' + sheet_num).slice(-3);
    }

    public increment(): ImageCount {
        return new ImageCount(this._value + 1);
    }
}