module.exports = class MenuElement {
    constructor(number, text) {
        this._number = number;
        this._text = text;
    }

    get number() {
        return this._number;
    }

    get text() {
        return this._text;
    }
}