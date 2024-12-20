export default () => ({
    database: {
        connectionString: process.env.DB_URI
    },

    jwt: {
        secretKey: process.env.JWT_SECRET,
    },

    mail: {
        mailHost: process.env.MAIL_HOST,
        mailPort: process.env.MAIL_PORT,
        mailUser: process.env.MAIL_USER,
        mailPass: process.env.MAIL_PASS
    }
})