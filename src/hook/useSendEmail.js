import { useState } from 'react';

const useSendEmail = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const sendEmail = async ({ email, subject, name, otp }) => {
        setLoading(true);
        setSuccess('');
        setError('');

        const localApi = process.env.API_URL;
        const productionApi = process.env.HOST_URL;
        const apiPoint = process.env.NODE_ENV === "development" ? localApi : productionApi;

        try {
            const response = await fetch(`${apiPoint}api/mail/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, subject, name, otp }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                setSuccess('Email sent successfully!');
            } else {
                console.error('Error response:', result);
                setError(result.error || 'Failed to send email');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('An error occurred while sending the email');
        } finally {
            setLoading(false);
        }
    };    

    return { sendEmail, loading, success, error };
};

export default useSendEmail;
