const Joi = require('joi');

const ReviewSchema = Joi.object({
    rating: Joi.number().min(0).max(5).required().messages({
        'number.base': 'Rating must be a number',
        'number.min': 'Rating must be between 0 and 5',
        'number.max': 'Rating must be between 0 and 5',
        'any.required': 'Rating is required'
    }),
    comments: Joi.string().min(1).required().messages({
        'string.base': 'Comments must be a valid string',
        'string.min': 'Comment cannot be empty',
        'any.required': 'Comments are required'
    })
});

module.exports = {ReviewSchema};
