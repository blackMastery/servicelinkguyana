const nodemailer = require('nodemailer');
const pug = require("pug");
const htmlToText = require("html-to-text");



const renderTemplate =( template, options) =>
     pug.renderFile(`${__dirname}/../templates/email/${template}.pug`, options);




module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.firstname;
        this.url = url;
        this.from = `Service Link guyana <kev.cadogan300@gmail.com> `;
    }

    newTransport() {
        // if (process.env.NODE_ENV === 'production') {
        // }
        //     // Sendgrid
        return nodemailer.createTransport({
                    service: 'SendGrid',
                    logger:true,
                    // connectionTimeout: 1000 * 60 * 3,
                    // greetingTimeout: 1000 * 60 * 3,
                    auth: {
                        user: process.env.SENDGRID_USERNAME,
                        pass: process.env.SENDGRID_PASSWORD
                    }
                });
                
        // return nodemailer.createTransport({
        //   host: process.env.EMAIL_HOST,
        //   port: process.env.EMAIL_PORT++,
    
          //   authMethod: "PLAIN",
        //   logger:true,
        //   connectionTimeout: 1000 * 60 * 3,
        //   greetingTimeout: 1000 * 60 * 3,
        //   auth: {
        //     user: process.env.EMAIL_USERNAME,
        //     pass: process.env.EMAIL_PASSWORD
        //   }
        // });
    }

    // Send the actual email
    async send(subject, res) {
        
        const html = pug.renderFile(
            `${__dirname}/../templates/email/passwordreset.pug`,
            {
                firstName: this.firstName,
                url: this.url,
                subject
            }
            );
      
    try {    // 
        // 2) Define email options
        const mailOptions = {
          from: this.from,
          to: this.to,
          subject,
          html,
          text: htmlToText.fromString(html)
          // text: `Please click the following link: ${this.url} to reset your password`

        };
        
        // 3) Create a transport and send email
        const onComplete = (err, info) => {
            if (err) {
                console.log(err, ">>> 63")
            }
            console.log({ info })
            return res.status(200).json({
                status: 'success',
                info,
                message: 'Token sent to email!'
            });

        }
        this.handleTransport(mailOptions, onComplete);

        }catch(err){
            console.log(err, 50,"<<<<")

    }
    
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Natours Family!');
    }
    


    async handleTransport(options, cb){
         const transporter =  this.newTransport()
         transporter.verify((error, success) => {
          if (error) {
              console.log(error, 57);
            } else {
                transporter.sendMail(options,cb);
        }
                
    });


    }
    async sendProposal(subject,opts, res){

        const options = {
            clientName: this.firstName,
            ...opts
        }
        const html = renderTemplate('proposals/sentproposal',options);
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        };

        const onComplete = (err, info) => {
            if (err) {
                console.log(err, ">>> 63")
                return res.status(404).json({
                    status: 'error',
                    err
                });
            }
            return res.status(200).json({
                status: 'success',
                info
            });

        }
        this.handleTransport(mailOptions, onComplete)
        
    }

    async sendPasswordReset(res) {
        await this.send(
            'Your password reset token (valid for only 10 minutes)',
            res
        );
    }
};
