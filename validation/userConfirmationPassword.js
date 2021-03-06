const Joi = require("joi");

const userPasswordSchema = Joi.string().min(8).max(32).required();

async function validatePassword(password) {
    let error, validPassword;

    try {
        validPassword = await userPasswordSchema.validateAsync(password);
        error = null;
    } catch (err) {
        err.message = err.message.replace("value", "confirmationPassword");
        error = err;
        validPassword = null;
    }

    return [error, validPassword];
}

module.exports = validatePassword;
