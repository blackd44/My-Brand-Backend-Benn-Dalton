import Joi from "joi";

const Validate_Comment = async data => {
    const Schema = Joi.object({
        owner: Joi.string().hex().length(24).label('owner'),
        message: Joi.string().min(5).required().label('message')
    })

    return Schema.validate(data, {
        abortEarly: false
    })
}

export default Validate_Comment