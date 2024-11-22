import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const body = await req.json();

        // Validate required fields
        if (!body.email || !body.subject || !body.message) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        // Create a transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Replace with your email provider's SMTP server
            port: 587, // Common port for SMTP
            secure: false, // Use true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password or app-specific password
            },
        });

        // Send mail
        const mailOptions = {
            from: `"Tripway Holidays" <${process.env.EMAIL_USER}>`, // Sender address
            to: body.email, // Recipient address
            subject: body.subject, // Subject line
            text: body.message, // Plain text body
        };

        const info = await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: 'Email sent successfully', info }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
}
