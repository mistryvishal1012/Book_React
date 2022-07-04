import Joi from 'joi';

const userSchema = Joi.object().keys({
    name : [Joi.string().min(5).max(10).required(), "Please Enter Your Name"],
    email : [Joi.string().required(), "Plesae Enter Password Between 8 to 10 Charchters"],
    password : [Joi.string().min(8).max(10).required(), "Plesae Enter Password Between 8 to 10 Charchters"],
    forgotPasswordQuestion : [Joi.string().max(50).required(), "Please Enter Security Question For Password"],
    forgotPasswordAnswer : [Joi.string().max(50).required(), "Please Enter Security Answer For Password"]
})

export default userSchema;