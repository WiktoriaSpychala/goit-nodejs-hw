const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string()
    .pattern(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
    .required()
    .messages({
      "any.required": "missing required email field",
    }),
  password: Joi.string().min(6).required().messages({
    "any.required": "missing required password field",
  }),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

const loginSchema = Joi.object({
    email: Joi.string()
        .pattern(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
        .required()
        .messages({
            "any.required": "missing required email field",
        }),
    password: Joi.string().min(6).required().messages({
        "any.required": "missing required password field",
    }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});
module.exports = {
  registerSchema,
    loginSchema,
    updateSubscriptionSchema,
};
