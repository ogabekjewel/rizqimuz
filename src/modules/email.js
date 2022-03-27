const nodemailer = require("nodemailer")
const { EMAIL, PASSWORD } = require("../../config")

module.exports = async function (to, subject, text, html) {
    try {   
        const transport = nodemailer.createTransport({
            host: "smpt.mail.ru",
            port: 465,
            secure: true,
            auth: {
                user: EMAIL,
                pass: PASSWORD,
            },
        })

        return await transport.sendMail({
            from: `"Rizqimuz" <ogabekmengniyozov@mail.ru>`,
            to,
            subject,
            text,
            html,
        })
    } catch(e) {
        console.log(e)
    }
}