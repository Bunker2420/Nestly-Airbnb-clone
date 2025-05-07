const wrapAsync = (func) => {
    return function (req, res, next) {
        // Execute the function, and if any error is thrown, it will be passed to the next middleware (error handler)
        func(req, res, next).catch(next);
    };
};
module.exports = wrapAsync;