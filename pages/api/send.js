const sgMail = require('@sendgrid/mail')
const cors = require('micro-cors')();

const send = cors(async(req, res) =>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const { to,
        from,
        subject,
        html } = JSON.parse(req.body)

    try {
        await sgMail.send({
            to,
            from,
            subject,
            html,
        })
        res.status(200).send('Message sent successfully.')
    } catch (error) {
        console.error('ERROR', error)
        res.status(400).send({reason:'Message not sent, check email server.', error:error?.message})
    }
})

export default send