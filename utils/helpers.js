module.exports = {
    // handlebars helper that converts a string to uppercase when called
    uppercaseString: (string) => string.toUpperCase(),
    isEqual: function(v1, v2, options) {
        if(v1 === v2) {
            return options.fn(this);
        }
            return options.inverse(this);
        }
};