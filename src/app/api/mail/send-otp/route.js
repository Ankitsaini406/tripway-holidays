import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { email, subject, message } = await req.json();

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // or your preferred email service
            auth: {
                user: 'tripwayholiday@gmail.com', // your email
                pass: 'ndie nzvc vsfy aatz', // your email password or app password
            },
        });

        // Email options
        const mailOptions = {
            from: 'tripwayholiday@gmail.com',
            to: email,
            subject,
            text: message,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ success: true, message: 'Email sent successfully!' }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
}
