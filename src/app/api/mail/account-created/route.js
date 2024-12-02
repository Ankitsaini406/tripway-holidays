import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { email, subject, name, password } = await req.json();

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
                Welcome to TripWay holidays! Your adventure starts here.
                Your Login Details:
                <p>Email: ${email}<br>
                Password: ${password}</p>
                <p>👉 Log in now to explore exciting destinations: <a href=https://tripwayholidays.in/auth/client-login >Login Here</a></p>
                <p>Need help? We’re here for you at ${emailApi}<br>
                Let’s make your travel dreams come true!</p>
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
