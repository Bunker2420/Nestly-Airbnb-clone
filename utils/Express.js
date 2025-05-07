class AppError extends Error
{
    constructor(status,message)
    {
        super();
        this.status = status;
        this.message = message;
        this.stack = (new Error()).stack;
    }
}
module.exports = AppError;