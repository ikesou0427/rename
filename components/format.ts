import Header from './header';
import ImageCount from './image-count';

export default class Format {
    private encode(str : string) : string {
        str = str.split(' ').join('\\' + ' ');
        str = str.split(')').join('\\' + ')');
        str = str.split('(').join('\\' + '(');
        return str;
    }

    public extractImagesNameFrom(input: string): Array<string> {
        return input.split('\n')
                    .map((str: string) => str.trim())
                    .map(this.encode)
                    .filter(Boolean)
                    // .map((str: string) => new ImageName(new Header(str.substr(0, 2)), new ImageCount(str.substr(2, 3))));
    }
}