const nodermailer = require("nodemailer");


//Used to connect to googles smtp servers.
const transporter = nodermailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
});

console.log(transporter);

transporter.verify((error,success)=>{
    if(error){
        console.log("Error connecting to email server: ", error);
    }else{
        console.log("Email server is ready to send messages");
    }
});


//function to send email
async function sendEmail(to,subject,text,html){
    try{
        const info = await transporter.sendMail({
            from: `"Janta-Bank" <${process.env.EMAIL_USER}>`,
            to,  //list of recievers
            subject, //SubjectLine
            text, //plain text body
            html, //html body
        });

        console.log(info);

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodermailer.getTestMessageUrl(info));
    }catch(error){
        console.log("Error sending email", error);
    }
}

async function sendRegistrationEmail(userEmail,userName){
    const subject = "Welcome to Janta Bank"
    const text = `Hello ${userName}, \n\nThankyou for registering at Janta Bank.
    We are excited to have you as customer!\n\nBest regards,\nJanta-Bank`;
    const html = ` <p>Hello ${userName},</p>
    <p>
        Thank you for registering at <strong>Janta Bank</strong>.<br>
        We are excited to have you as a customer!
    </p>

    <p>
        Best regards,<br>
        <strong>Janta Bank</strong>
    </p>`;

    await sendEmail(userEmail,subject,text,html);
}

module.exports = {
    sendRegistrationEmail
};
