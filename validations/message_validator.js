import Joi from "joi"

const Validate_Message = data => {
    const Schema = Joi.object({
        email: Joi.string().email().required().label('email'),
        content: Joi.string().min(5).required().label('content')
    })

    return Schema.validate(data, {
        abortEarly: false
    })
}

export default Validate_Message