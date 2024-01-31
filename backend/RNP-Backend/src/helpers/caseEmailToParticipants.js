const nodemailer = require('nodemailer');

const caseDecisionMail = async (receiver, partipantName, attachmentPath) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nodereactproject2023@gmail.com',
            pass: 'kednhlntspkrqrvp'
        }
    });

    const mailOptions = {
        from: 'nodereactproject2023@gmail.com',
        to: receiver,
        subject: 'POLICE DECISION - ACCIDENT REPORT',
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #d9534f; text-align: center;">Police Decision - Accident Report </h2>
            <p style="color: #555; text-align: center;">Dear ${partipantName},</p>
            <p style="color: #555; text-align: center;">We would like to inform you that the police have made a decision regarding the accident report, and the attached document needs to be submitted to the insurance company.</p>
            <p style="color: #555; text-align: center;">Details of the accident report:</p>
            <ul style="color: #777; margin-left: 20px; padding-left: 20px;">
                <strong>Thank you for your cooperation.</strong>
            </ul>
            <p style="color: #888; text-align: center;">If you have any questions or concerns, please contact us at <a href="mailto:questions@rnpaies-inquiry.com">support@example.com</a>.</p>
            <p style="color: #888; text-align: center;">Thank you for your understanding.</p>
            <p style="color: #888; text-align: center;">Sincerely,<br>Rwanda National Police Accident Investigation System</p>
        </div>
    </div>    
        `,
        attachments: [
            {
                path: attachmentPath, // Path to the accident report document
            },
        ],
    };

    try {
        // send mail
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = caseDecisionMail;
