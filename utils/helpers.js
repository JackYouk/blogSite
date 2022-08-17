module.exports = {
    // handlebars helper that converts a string to uppercase when called
    toString: (str) => str.toString(),
    isEqual: function(v1, v2, options) {
        if(v1 === v2) {
            return options.fn(this);
        }
            return options.inverse(this);
        }
};