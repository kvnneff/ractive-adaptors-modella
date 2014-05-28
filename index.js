'use strict';

var adaptor,
    ModellaWrapper;

/**
 * Expose `adaptor`
 * @param  {Array} instances Modella constructor instances
 * @return {Object}           Returns adaptor object
 */
module.exports = function adaptor(instances) {
    var filter,
        wrap;

    if (!instances.length) {
        throw new TypeError('expected: Model instance');
    }

    /**
     * Filter for modella models
     * @param  {Object} object Data object from Ractive
     * @return {Model}        Returns object if its a model
     */
    filter = function filter(object) {
        var i = instances.length;

        while (i--) {
            if (object instanceof instances[i]) {
                return object;
            }
        }
    };

    /**
     * Wrap the modella model
     * @param  {Object} ractive  Ractive
     * @param  {Model} object   Modella model
     * @param  {String} keypath  Ractive keypath
     * @param  {Function} prefixer Ractive prefixer
     * @return {Object}          Returns wrapped object
     */
    wrap = function wrap(ractive, object, keypath, prefixer) {
        return new ModellaWrapper(ractive, object, keypath, prefixer);
    };

    return {
        filter: filter,
        wrap: wrap
    };
};

/**
 * Model wrapper
 * @param  {Object} ractive  Ractive
 * @param  {Model} object   Modella model
 * @param  {String} keypath  Ractive keypath
 * @param  {Function} prefixer Ractive prefixer
 */
ModellaWrapper = function ModellaWrapper(ractive, model, keypath, prefixer) {
    var self = this;

    this.model = model;
    this.changing = false;

    this.changeHandler = function changeHandler() {
        self.changing = true;
        ractive.set(prefixer(model.changed));
        self.changing = false;
    };

    model.on('change', this.changeHandler);
};

ModellaWrapper.prototype.get = function get() {
    return this.model.attrs;
};

ModellaWrapper.prototype.set = function set(keypath, value) {
    if (!this.changing && keypath.indexOf('.') === -1) {
        this.model.set(keypath, value);
    }
};

ModellaWrapper.prototype.reset = function reset(object) {
    // Modella does not provide a reset method
    return false;
};

ModellaWrapper.prototype.teardown = function teardown() {
    this.model.off('change', this.changeHandler);
};