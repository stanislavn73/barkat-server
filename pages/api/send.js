const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const { body } = req

    try {
        await sgMail.send(body)
        res.status(200).send('Message sent successfully.')
    } catch (error) {
        console.error('ERROR', error)
        res.status(400).send('Message not sent, check email server.')
    }
}