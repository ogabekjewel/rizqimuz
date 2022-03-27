require("dotenv").config()

const { env } = process

module.exports = {
    PORT: env.PORT,
    MONGO_URL: env.MONGO_URL,
    EMAIL: env.EMAIL,
    PASSWORD: env.PASSWORD,
    SECRET_WORD: env.SECRET_WORD,
}