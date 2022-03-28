module.exports = class Fast {
    constructor(_status, _started, _ending, _type) {
        this._status = _status;
        this._started = _started;
        this._ending = _ending;
        this._type = _type;
    }

    get status() {
        return this._status;
    }

    get started() {
        return this._started;
    }

    get ending() {
        return this._ending;
    }

    get type() {
        return this._type;
    }
}