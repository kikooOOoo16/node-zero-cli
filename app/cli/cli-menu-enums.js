// Season enums can be grouped as static members of a class
module.exports = class CliMenuType {
    // Create new instances of the same class as static attributes
    static ACTIVE_FAST = new CliMenuType('ACTIVE_FAST');
    static NO_ACTIVE_FAST = new CliMenuType('NO_ACTIVE_FAST');
    static FAST_TYPE_OPTIONS = new CliMenuType('FAST_TYPE_OPTIONS');
    static CURRENT_FAST = new CliMenuType('CURRENT_FAST');
    static NO_CURRENT_FAST = new CliMenuType('NO_CURRENT_FAST');
    static ALL_PREVIOUS_FASTS = new CliMenuType('ALL_PREVIOUS_FASTS');

    constructor(value) {
        this.value = value;
    }
}