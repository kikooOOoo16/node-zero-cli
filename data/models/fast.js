module.exports = class Fast {
    constructor(_status, _started, _ending, _type, _elapsedTime) {
        this._status = _status;
        this._started = _started;
        this._ending = _ending;
        this._type = _type;
        // set _elapsedTime to be an optional parameter
        this._elapsedTime = _elapsedTime || 0;
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

    get elapsedTime() {
        return this._elapsedTime;
    }
}