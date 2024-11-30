import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { email, subject, name, otp } = await req.json();

        const emailApi = process.env.NEXT_APP_EMAIL;
        const emailPassword = process.env.NEXT_APP_PASSWORD;

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // or your preferred email service
            auth: {
                user: emailApi, // your email
                pass: emailPassword, // your email password or app password
            },
        });

        // Email options
        const mailOptions = {
            from: `Tripway Holidays <${emailApi}>`,
            to: email,
            subject: subject,
            html: `<p>Hi ${name},</p>
                        Use this OTP to continue your travel booking: <p style="font-size: 18px; font-weight: bold; margin: 20px 0; color: #000;">${otp}</p>\n
                        <p>It will expire in 10 minutes, so don’t wait!<br>
                        For assistance, contact us at ${emailApi}.</p>
                    <p>Safe travels,<br>
                    <strong>Tripway Holidays Team</strong></p>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ success: true, message: 'Email sent successfully!' }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
}
