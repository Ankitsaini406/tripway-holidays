import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { email, subject, name, tourDate, tourTime,tourLocation } = await req.json();

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
            html: `<p>Dear ${name},</p>
                Your adventure awaits! Your group tour is officially confirmed. Check out the details below:
                <h3>🗓 Tour Info</h3>
                <ul>
                <li>Date: ${tourDate}</li>
                <li>Time: ${tourTime}</li>
                <li>Meeting Point: ${tourLocation}</li>
                </ul><br>
                <h3>🛂 What to Bring</h3>
                <p>1. ID Proof: Aadhar Card, PAN Card, or Driving License.</p>
                <p>2. Passport-sized Photo.</p>
                <p>3. Comfortable clothing & walking shoes.</p><br>
                <p>Need help? We’re here for you at ${emailApi}
                See you soon!</p><br>
                    <p>Best regards,
                    <strong>Team TripwayHolidays</strong></p><br>
                    <h3>🌐 Stay Connected</h3><br>
                    <hr>
                <table style="width: 100%; text-align: center; margin-top: 20px;">
                    <tr>
                        <td style="padding: 5px;">
                            <a href="https://www.instagram.com/tripwayholiday" target="_blank">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" style="width: 30px; height: 30px;">
                            </a>
                        </td>
                        <td style="padding: 5px;">
                            <a href="https://www.facebook.com/tripwayholidays" target="_blank">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png" alt="Facebook" style="width: 30px; height: 30px;">
                            </a>
                        </td>
                        <td style="padding: 5px;">
                            <a href="https://www.youtube.com/@tripwayholidays" target="_blank">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" style="width: 30px; height: 30px;">
                            </a>
                        </td>
                        <td style="padding: 5px;">
                            <a href="https://x.com/tripwayholidays" target="_blank">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/X_logo.jpg" alt="Twitter" style="width: 30px; height: 30px;">
                            </a>
                        </td>
                    </tr>
                </table>
                <p style="font-size: 12px; color: #888; text-align: center; margin-top: 10px;">
                    Follow us on social media to stay updated with the latest news and offers!
                </p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ success: true, message: 'Email sent successfully!' }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
}
