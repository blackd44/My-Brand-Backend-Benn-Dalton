import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const JoiPassword = Joi.extend(joiPasswordExtendCore)

const validate_user = data => {
    const Schema = Joi.object({
        username: Joi
            .string()
            .min(3)
            .required()
            .label("username"),
        email: Joi
            .string()
            .email()
            .required()
            .label('email'),
        password: JoiPassword
            .string()
            .min(6)
            .max(16)
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .required()
            .label("password"),
    })

    return Schema.validate(data, {
        abortEarly: false
    })
}

export default validate_user