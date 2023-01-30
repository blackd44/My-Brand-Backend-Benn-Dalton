import Joi from "joi";

const Validate_Blog = async data => {
    const Schema = Joi.object({
        owner: Joi.string().hex().length(24),
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