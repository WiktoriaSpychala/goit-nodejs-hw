const nodemailer = require("nodemailer");
require("dotenv").config();

const config = {
    pool: true,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
};


const sendEmail = async (data) => {
    const transport = nodemailer.createTransport(config);
    const email = { ...data, from: process.env.MAIL_USER };
    return await transport.sendMail(email);
};

module.exports = sendEmail;