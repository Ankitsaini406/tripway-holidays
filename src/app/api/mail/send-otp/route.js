import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { email, otp } = await req.json();

        const emailApi = process.env.NEXT_APP_EMAIL;
        const emailPassword = process.env.NEXT_APP_PASSWORD;

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "Gmail", // or your preferred email service
            auth: {
                user: emailApi, // your email
                pass: emailPassword, // your email password or app password
            },
        });

        // Email options
        const mailOptions = {
            from: `Tripway Holidays <${emailApi}>`,
            to: email,
            subject: 'Your OTP for Travel Booking Confirmation',
            text: `Hi [Customer Name],\n\nUse this OTP to continue your travel booking: ${otp}\nIt will expire in 10 minutes, so don’t wait!\n\nFor assistance, contact us at ${emailApi}\n\nSafe travels,\nTripwayHolidays`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return new Response(
            JSON.stringify({ success: true, message: "Email sent successfully!" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ error: "Failed to send email" }), {
            status: 500,
        });
    }
}
