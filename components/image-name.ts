import Header from "./header";
import ImageCount from "./image-count";

export default class ImageName {
    private _header: Header;
    private _image_count: ImageCount;

    constructor(header: Header, image_count: ImageCount) {
        this._header = header;
        this._image_count = image_count;
    }

    get value() {
        return this._header.value + this._image_count.value + '.jpg';
    }

    public next(): ImageName {
        return new ImageName(this._header, this._image_count.increment());
    }
}