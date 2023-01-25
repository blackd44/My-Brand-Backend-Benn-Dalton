import Joi from "joi";

const Validate_Blog = async data => {
    const Schema = Joi.object({
        owner: Joi.object().keys({
            username: Joi.string().min(3).label('username'),
            email: Joi.string().email().required().label('email'),
        }),
        title: Joi.string().min(3).required().label('title'),
        content: Joi.string().min(5).required().label('content'),
        image: Joi.string().required().label('image'),
        comments: Joi.array().label('comments')
    })

    return Schema.validate(data, {
        abortEarly: false
    })
}

export default Validate_Blog